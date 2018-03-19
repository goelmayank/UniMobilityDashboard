import {Observable} from "rxjs/Observable";
import {combineLatest} from "rxjs/observable/combineLatest";
import {distinctUntilChanged, map, share} from "rxjs/operators";

export const CombineLoadings$ = (...args: Observable<any>[]) => {
  const loadings$ = args.map((loading$) => {
    return loading$
      .pipe(
        map(data => !!data),
        distinctUntilChanged()
      );
  });

  return combineLatest(
    ...loadings$,
    (...args: boolean[]) => {
      return args.reduce((acc, arg) => {
        return acc || arg
      }, false)
    }
  ).pipe(
    distinctUntilChanged(),
    share()
  );
};