import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs/observable/combineLatest";
import { distinctUntilChanged } from "rxjs/operators";

export const andCombine = (...source$: Observable<any>[]) => {
  return combineLatest(
    ...source$.filter(data => !!data),
    (...args: any[]): boolean => {
      return args.reduce((acc, arg) => {
        return acc && !!arg;
      }, true);
    }
  ).pipe(distinctUntilChanged());
};
