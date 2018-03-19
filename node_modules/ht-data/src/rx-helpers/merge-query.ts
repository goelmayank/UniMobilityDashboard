import { map } from "rxjs/operators";

export const MergeQuery = defaultQuery => {
  return query$ => {
    return query$.pipe(
      map(query => {
        console.log(query);
        return query ? { ...defaultQuery, ...query } : query;
      })
    );
  };
};
