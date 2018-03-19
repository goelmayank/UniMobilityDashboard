import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs/observable/combineLatest";
import { distinctUntilChanged } from "rxjs/operators";

export const orCombine = (...source$: Observable<any>[]) => {
  return combineLatest(...source$, (...args: any[]) => {
    return args.reduce((acc, arg) => {
      return acc || !!arg;
    }, false);
  });
};
