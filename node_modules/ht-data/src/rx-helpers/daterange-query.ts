import { Observable } from "rxjs/Observable";
import { IDateRange } from "ht-models";
import { map } from "rxjs/operators";

export const DateRangeToQuery$ = (
  dateRangeParam: string
): ((param: Observable<IDateRange>) => Observable<object>) => {
  return (dateRangeQuery$: Observable<IDateRange>) => {
    return dateRangeQuery$.pipe(
      map(dateRange => {
        if (!dateRange || (typeof dateRange == 'object' && Object.keys(dateRange).length == 0)) return {};
        let start = dateRange["start"];
        let end = dateRange["end"];
        let param = dateRangeParam;
        return { [`min_${param}`]: start, [`max_${param}`]: end };
      })
    );
  };
};
