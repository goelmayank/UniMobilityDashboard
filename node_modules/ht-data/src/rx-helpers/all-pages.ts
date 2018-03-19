import {Page} from "ht-models";
import {expand, map} from "rxjs/operators";
import {empty} from "rxjs/observable/empty";
import {Observable} from "rxjs/Observable";

export function allPages<T = any>(api$: Observable<Page<T>>, req$: (url: string, options: object) => Observable<Page<T>>, options = {}) {
  return api$.pipe(
    expand((data: Page<T>) => {
      return data["next"]
        ? req$(data["next"], options).pipe(
          map((newData: Page<T>) => {
            return {...newData, results: [...data.results, ...newData.results]}
          })
        )
        : empty();
    })
  );
}