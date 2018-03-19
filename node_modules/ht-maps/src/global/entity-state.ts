import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {distinctUntilChanged, pluck} from "rxjs/operators";
import { map } from "rxjs/operators/map";
import { withLatestFrom } from "rxjs/operators/withLatestFrom";

export class EntityState<S = any> {
  stateSubject$: BehaviorSubject<object> = new BehaviorSubject<object>({});
  state$: Observable<object> = this.stateSubject$.asObservable();

  dataSubject$: ReplaySubject<S[]> = new ReplaySubject<S[]>();
  data$ = this.dataSubject$.asObservable();

  stateTrasfrom: {
    selector: string,
    map(data, state): any;
  }[] = [];

  constructor() {
    this.data$.pipe(
      withLatestFrom(this.state$),
      map(([data, state]) => {
        return this.stateTrasfrom.reduce((acc, trasform) => {
          return {...acc, [trasform.selector]: trasform.map(data, acc)}
        }, state)
      })
    ).subscribe(this.stateSubject$)
  }
  setState(selector, value) {
    const state = {...this.stateSubject$.getValue(), [selector]: value};
    this.stateSubject$.next(state)
  };

  addState(selector, map) {
    //todo dont add of contains
    this.stateTrasfrom.push({selector, map})
  }

  selector(selector): Observable<any> {
    return this.state$.pipe(
      pluck(selector),
      distinctUntilChanged()
    )
  }

  setData(data: S[]) {
    this.dataSubject$.next(data)
  }


}