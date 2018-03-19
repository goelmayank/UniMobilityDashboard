import { Observable } from "rxjs/Observable";
import * as _ from "underscore";
import { expand, filter, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";
import { Constructor } from "ht-models";

import { Subscription } from "rxjs/Subscription";
import { empty } from "rxjs/observable/empty";
import { Page } from "ht-models";

export interface IIdQueryDataBase {
  updateStrategy: string;
  getFirstData$([id, query]): Observable<any>;
  pollDuration: number;
  api$(id: string, query: object): Observable<any>;
}

export function getIdQueryDataMixin<
  TBase extends Constructor<IIdQueryDataBase>
>(Base: TBase) {
  return class extends Base {
    getData$([id, query]) {
      let update = this.getFirstData$([id, query]).pipe(
        expand(data => {
          return timer(this.pollDuration).pipe(
            switchMap(() => {
              return this.api$(id, query);
            })
          );
        })
      );

      return this.updateStrategy != "once"
        ? update
        : this.getFirstData$([id, query]);
    }
  };
}

export interface IGetPageDataBase {
  updateStrategy: string;
  getFirstData$([query]): Observable<any>;
  pollDuration: number;
  api$(query: object): Observable<Page<any>>;
}

export function getPageDataMixin<TBase extends Constructor<IGetPageDataBase>>(
  Base: TBase
) {
  return class extends Base {
    getData$([query]) {
      let update = this.getFirstData$([query]).pipe(
        expand(data => {
          return timer(this.pollDuration).pipe(
            switchMap(() => {
              if (this.updateStrategy == "live") {
                return this.api$(query);
              } else {
                let ids: string[] = _.map(data.results, item => {
                  return item["id"];
                });
                let updateQuery = {
                  ...query,
                  id: ids.toString(),
                  status: null,
                  page: null
                };
                return this.api$(updateQuery).pipe(
                  map(newData => {
                    return { ...data, results: newData.results };
                  })
                );
              }
            })
          );
        })
      );
      return this.updateStrategy != "once"
        ? update
        : this.getFirstData$([query]);
    }
  };
}

export interface IGetQueryDataBase {
  updateStrategy: string;
  getFirstData$([query]): Observable<any>;
  pollDuration: number;
  api$(query): Observable<any>;
}

export function getQueryDataMixin<TBase extends Constructor<IGetQueryDataBase>>(
  Base: TBase
) {
  return class extends Base {
    getData$([query]) {
      let update = this.getFirstData$([query]).pipe(
        expand(data => {
          return timer(this.pollDuration).pipe(
            switchMap(() => {
              return this.api$(query);
            })
          );
        })
      );
      return this.updateStrategy != "once"
        ? update
        : this.getFirstData$([query]);
    }
  };
}

export interface IGetAllPageDataBase {
  getFirstData$([query]): Observable<any>;
  api$(query): Observable<Page<any>>;
}

export function getAllPageDataMixin<
  TBase extends Constructor<IGetAllPageDataBase>
>(Base: TBase) {
  return class extends Base {
    getData$([query]) {
      return this.getFirstData$([query]);
    }
  };
}
