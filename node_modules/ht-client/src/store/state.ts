import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";
import { Dispatcher } from "./dispatcher";
import { Observable } from "rxjs/Observable";
import { Action, ActionReducer } from "./models";
import { observeOn } from "rxjs/operator/observeOn";
import { queue } from "rxjs/scheduler/queue";
import { withLatestFrom } from "rxjs/operator/withLatestFrom";
import { scan } from "rxjs/operator/scan";
import { ScannedActionsSubject } from "./scanned-action";
import { ReducerObservable } from "./reducer-manager";

export abstract class StateObservable extends Observable<any> {}

export class State<T> extends BehaviorSubject<any> {
  static readonly INIT = "INIT";

  private stateSubscription: Subscription;

  constructor(
    actions$: Dispatcher,
    reducer$: ReducerObservable,
    scannedActions: ScannedActionsSubject,
    initialState: any
  ) {
    super(initialState);

    const actionsOnQueue$: Observable<Action> = observeOn.call(actions$, queue);
    const withLatestReducer$: Observable<
      [Action, ActionReducer<any, Action>]
    > = withLatestFrom.call(actionsOnQueue$, reducer$);
    const stateAndAction$: Observable<{
      state: any;
      action: Action;
    }> = scan.call(withLatestReducer$, reduceState, { state: initialState });

    this.stateSubscription = stateAndAction$.subscribe(({ state, action }) => {
      this.next(state);
      scannedActions.next(action);
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.complete();
  }
}

export type StateActionPair<T, V extends Action = Action> = {
  state: T | undefined;
  action?: V;
};
export function reduceState<T, V extends Action = Action>(
  stateActionPair: StateActionPair<T, V> = { state: undefined },
  [action, reducer]: [V, ActionReducer<T, V>]
): StateActionPair<T, V> {
  const { state } = stateActionPair;
  return { state: reducer(state, action), action };
}
