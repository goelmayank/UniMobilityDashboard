import { Observable } from "rxjs/Observable";
import { Page } from "ht-models";
import { IDateRange } from "../interfaces";
import * as _ from "underscore";
import { combineLatest } from "rxjs/observable/combineLatest";
import { distinctUntilChanged, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export const MergeQuery = defaultQuery => {
  return query$ => {
    return query$.pipe(
      map(query => {
        return { ...defaultQuery, ...query };
      })
    );
  };
};

// export const CombineQuery = (addQuery$) => {
//   return (query$) => {
//     if(addQuery$) {
//       return combineLatest(
//         addQuery$,
//         query$,
//         (addQuery, query) => {
//           return query ? {...addQuery, ...query} : query;
//         }
//       )
//     } else {
//       return query$
//     }
//
//   }
// };

// export const PageResults = (pageData$: Observable<Page<any> | null>): Observable<any[] | any> => {
//   return pageData$.pipe(map((pageDate: Page<any> | null) => {
//     return pageDate ? pageDate.results : pageDate;
//   }))
// };

// export const DateRangeToQuery = (dateRangeParam: string): (param: Observable<IDateRange>) => Observable<object> => {
//   return (dateRangeQuery$: Observable<IDateRange>) => {
//     return dateRangeQuery$.pipe(
//       map((dateRange) => {
//         if (!dateRange) return {};
//         let start =  dateRange['start'];
//         let end = dateRange['end'];
//         let param = dateRangeParam;
//         return {[`min_${param}`]: start, [`max_${param}`]: end}
//       })
//     )
//   }
// };

export const AllowedQueryKeys = (allowedQueryKeys?: string[] | null) => {
  return queryStore$ => {
    if (allowedQueryKeys && allowedQueryKeys.length) {
      let keys$ = _.map(allowedQueryKeys, (key: string) => {
        return queryStore$.pipe(
          map(store => (store ? store[key] : null)),
          distinctUntilChanged(),
          map(value => {
            return value ? { [key]: value } : null;
          })
        );
      });
      return combineLatest(...keys$).pipe(
        map(obsArray => {
          return _.reduce(
            obsArray,
            (acc, query) => {
              return query ? { ...acc, ...query } : acc;
            },
            {}
          );
        })
      );
    } else if (allowedQueryKeys) {
      return of({});
    } else {
      return queryStore$;
    }
  };
};

// export const itemAsPage = <T>() => {
//   return (item$): Observable<Page<T>> => {
//     return item$.pipe(
//       map((item) => {
//         return item ?
//           {
//             count: 1,
//             next: null,
//             previous: null,
//             results: [item]
//           } : null
//       })
//     )
//   }
// };
