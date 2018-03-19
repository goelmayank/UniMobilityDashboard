import { filter } from "rxjs/operators/filter";
import { map } from "rxjs/operators/map";
import * as _ from "underscore";
import { EntityListClient } from "./list-client";
import { Observable } from "rxjs/Observable";
import { AllData, Page } from "ht-models";
import { pluck } from "rxjs/operators";

export abstract class EntityAllItemsClient extends EntityListClient {
  updateStrategy = "once";
  allowedQueryKeys = ["search", "status"];
  abstract dataEntities$: Observable<AllData<any>>;
  // data$: Observable<Page<any>>;
  constructor() {
    super();
  }

  get data$() {
    return this.dataEntities$.pipe(
      map((allData: AllData<any>) => {
        if (!allData) return allData;
        let results = _.values(allData.resultsEntity);
        return {
          count: allData.count || 0,
          results,
          previous: allData.previous || "",
          next: allData.next || ""
        };
      })
    );
  }

  getDefaultQuery(): object {
    return {
      ...super.getDefaultQuery(),
      page_size: 100,
      ordering: "-created_at"
    };
  }
  abstract setLoading(data);
  firstDataEffect(data) {
    if ((data && !data.next) || !data) {
      this.setLoading(false);
    }
  }

  get dataArray$() {
    let dataArray$ = this.data$.pipe(
      filter((data: any) => !!data),
      map((data: AllData<any>) => {
        var resutls = _.values(data.resultsEntity);
        return resutls;
      })
    );
    return dataArray$;
  }
  getAllMarkers$() {
    const allMarkers$ = this.dataArray$.pipe(
      map(markers => {
        return _.reduce(
          markers,
          (acc, marker) => {
            const isValid = this.isValidMarker(marker);
            if (isValid) {
              acc.valid.push(marker);
            } else {
              acc.invalid.push(marker);
            }
            return acc;
          },
          { valid: [], invalid: [] }
        );
        // return markers
      })
    );

    return allMarkers$;
  }

  isValidMarker(marker) {
    return true;
  }
  getMarkers$() {
    return this.getAllMarkers$().pipe(pluck("valid"));
  }
  // getResults(isFirstCb?) {
  //   return this.data$.pipe(
  //     map((allData: AllData<any>) => {
  //       if(allData && !allData.previous && isFirstCb) isFirstCb();
  //       if(!allData) return allData;
  //       return _.values(allData.resultsEntity)
  //     })
  //   )
  // }
}
