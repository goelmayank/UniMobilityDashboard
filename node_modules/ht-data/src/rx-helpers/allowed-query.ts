import {distinctUntilChanged, filter, map, scan} from "rxjs/operators";
import { combineLatest } from "rxjs/observable/combineLatest";
import { of } from "rxjs/observable/of";

export const AllowedQueryKeys$ = (allowedQueryKeys?: string[] | null) => {
  return queryStore$ => {
    if (allowedQueryKeys && allowedQueryKeys.length) {
      let keys$ = allowedQueryKeys.map((key: string) => {
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
          console.log(obsArray, "arr");
          return obsArray.reduce((acc, query) => {
            return query ? { ...acc, ...query } : acc;
          }, {});
        })
      );
    } else if (allowedQueryKeys) {
      return of({});
    } else {
      return queryStore$;
    }
  };
};

export const AllowedQueryMap = (allowedQueryMaps?: IAllowedQueryMap[]) => {
  return (queryStore$) => {
    if(allowedQueryMaps && allowedQueryMaps.length) {

      let keys$ = allowedQueryMaps.map((queryMap: IAllowedQueryMap) => {
        return queryStore$.pipe(
          map(store => (store ? store[queryMap.key] : null)),
          scan((acc: {value: any, oldValue: any}, value: any) => {
            return {value, oldValue: acc.value}
          }, {value: "_no_val", oldValue: "_"}),
          filter((obj: {value: any, oldValue: any}) => {
            if (obj.oldValue == "_no_val") {
              return true
            } else if(!obj.oldValue || !obj.value) {
              return false
            } else if(obj.oldValue == obj.value) {
              return false //distinct unntil changed
            } else if(queryMap.filter) {
              return queryMap.filter(obj.value, obj.oldValue)
            } else {
              return true
            }
          }),

          map((obj: {value: any, oldValue: any}) => {
            return obj.value ? { [queryMap.key]: obj.value } : null;
          })
        );
      });
      return combineLatest(...keys$).pipe(
        map(obsArray => {
          // console.log(obsArray, "arr");
          return obsArray.reduce((acc, query) => {
            return query ? { ...acc, ...query } : acc;
          }, {});
        })
      );
      // return queryStore$
    } else if (allowedQueryMaps) {
      return of({});
    } else {
      return queryStore$
    }

  }
};

export interface IAllowedQueryMap {
  key: string,
  filter?: (value, oldValue) => boolean
}
