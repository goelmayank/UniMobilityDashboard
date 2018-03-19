import { map } from "rxjs/operators";
import { Page } from "ht-models";
import { Observable } from "rxjs/Observable";

export const itemAsPage = <T>() => {
  return (item$): Observable<Page<T>> => {
    return item$.pipe(
      map(item => {
        console.log("item", item);
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
