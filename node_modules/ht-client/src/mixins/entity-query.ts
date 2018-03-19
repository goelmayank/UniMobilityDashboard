import { Observable } from "rxjs/Observable";
// import {MergeQuery} from "ht-data";
import {CombineQueries, AllowedQueryMap, IAllowedQueryMap, DateRangeToQuery$} from "ht-data";
import {filter, map, mergeMap, switchMap, takeUntil} from "rxjs/operators";
import { combineLatest } from "rxjs/observable/combineLatest";
import { empty } from "rxjs/observable/empty";
import { MergeQuery, AllowedQueryKeys } from "../helpers/operators";
import { Constructor } from "ht-models";
import { of } from "rxjs/observable/of";
import {DateRange} from "../global/date-range";

export interface IListQueryBase {
  query$: Observable<null | object>;
  // allowedQueryKeys?: string[];
  allowedQueryMap?: IAllowedQueryMap[];
  getDefaultQuery(): object;
  dateRange?: DateRange;
  dateParam?: string;
  active$?: Observable<boolean>;
}

export function listQueryMixin<TBase extends Constructor<IListQueryBase>>(
  Base: TBase
) {
  return class extends Base {
    getApiQuery$(): Observable<any> {
      return this.getApiParams$().pipe(
        map((data: any[]) => {
          return data[0];
        })
      );
    }

    getBaseQuery$() {
      let baseQuery$ = this.query$.pipe(
        AllowedQueryMap(this.allowedQueryMap),
        MergeQuery(this.getDefaultQuery()),
        CombineQueries([this.dateRange.data$.pipe(DateRangeToQuery$(this.dateParam)) || of({})])
      );

      return baseQuery$;
    }

    getApiParams$() {

      const baseQuery$ = this.getBaseQuery$().pipe(
        map(data => {
          return [data];
        })
      );
      return this.active$
        ? this.active$.pipe(
            switchMap((isActive: boolean) => {
              // console.log(isActive, "accc");
              return isActive ? baseQuery$ : of([]);
            })
          )
        : baseQuery$;
    }
  };
}

export interface IItemQueryBase {
  query$: Observable<null | object>;
  // allowedQueryKeys?: string[],
  getDefaultQuery(): object;
  // dateRangeQuery$?: Observable<object>,
  // active$?: Observable<boolean>,
  id$: Observable<string | null>;
}

export function itemQueryMixin<TBase extends Constructor<IItemQueryBase>>(
  Base: TBase
) {
  return class extends Base {
    getApiQuery$() {
      return this.getApiParams$().pipe(
        map(data => {
          return data[1];
        })
      );
    }

    getApiParams$() {
      return combineLatest(
        this.id$,
        this.query$.pipe(MergeQuery(this.getDefaultQuery()))
      );
    }
  };
}
