import { combineLatest } from "rxjs/observable/combineLatest";
import { Observable } from "rxjs/Observable";

export const CombineQueries = (addQueries$: Observable<any>[]) => {
  return query$ => {
    if (addQueries$ && addQueries$.length) {
      return combineLatest(
        query$,
        ...addQueries$.filter(data => !!data),
        (query, ...addQueries) => {
          if (!query) return query;
          return addQueries.reduce((acc, currentQ) => {
            return { ...currentQ, ...acc };
          }, query);
        }
      );
    } else {
      return query$;
    }
  };
};
