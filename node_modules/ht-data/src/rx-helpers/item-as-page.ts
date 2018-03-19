import { Observable } from "rxjs/Observable";
import { Page } from "ht-models";
import { map } from "rxjs/operators";

export const itemAsPage$ = <T>() => {
  return (item$): Observable<Page<T>> => {
    return item$.pipe(
      map(item => {
        return item
          ? {
              count: 1,
              next: null,
              previous: null,
              results: [item]
            }
          : null;
      })
    );
  };
};
