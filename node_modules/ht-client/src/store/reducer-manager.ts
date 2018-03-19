import {
  ActionReducer,
  ActionReducerFactory,
  ActionReducerMap,
  StoreFeature
} from "./models";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { createReducerFactory, omit } from "./utils";
import { Dispatcher } from "./dispatcher";

export abstract class ReducerObservable extends Observable<
  ActionReducer<any, any>
> {}
export abstract class ReducerManagerDispatcher extends Dispatcher {}
export const UPDATE = "@ngrx/store/update-reducers" as "@ngrx/store/update-reducers";

export class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
  constructor(
    private dispatcher: ReducerManagerDispatcher,
    private initialState: any,
    private reducers: ActionReducerMap<any, any>,
    private reducerFactory: ActionReducerFactory<any, any>
  ) {
    super(reducerFactory(reducers, initialState));
  }

  addFeature({
    reducers,
    reducerFactory,
    metaReducers,
    initialState,
    key
  }: StoreFeature<any, any>) {
    const reducer =
      typeof reducers === "function"
        ? (state: any, action: any) => reducers(state || initialState, action)
        : createReducerFactory(reducerFactory, metaReducers)(
            reducers,
            initialState
          );

    this.addReducer(key, reducer);
  }

  removeFeature({ key }: StoreFeature<any, any>) {
    this.removeReducer(key);
  }

  addReducer(key: string, reducer: ActionReducer<any, any>) {
    this.reducers = { ...this.reducers, [key]: reducer };

    this.updateReducers();
  }

  removeReducer(key: string) {
    this.reducers = omit(this.reducers, key);

    this.updateReducers();
  }

  private updateReducers() {
    this.next(this.reducerFactory(this.reducers, this.initialState));
    this.dispatcher.next({ type: UPDATE });
  }

  ngOnDestroy() {
    this.complete();
  }
}
