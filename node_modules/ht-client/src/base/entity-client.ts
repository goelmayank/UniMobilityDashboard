import { Observable } from "rxjs/Observable";
import * as _ from "underscore";
import { Page } from "ht-models";
import { combineLatest } from "rxjs/observable/combineLatest";
import { distinctUntilChanged, map } from "rxjs/operators";
import { itemAsPage$ } from "ht-data";

export abstract class EntityClient {
  dataArrayWithSelected$(id$, dataArray$, selected$) {
    const userId$ = id$;
    const placelinePage$ = selected$.pipe(
      distinctUntilChanged(),
      map(data => {
        return data ? [data] : null;
      })
    ); //todo take query from placeline

    const array$ = combineLatest(
      placelinePage$,
      userId$,
      dataArray$,
      (placelinePage, userId, dataArray: any[]) => {
        const filteredData = _.filter(dataArray, user => {
          return userId ? user.id == userId : true;
        });
        return placelinePage && userId ? placelinePage : filteredData;
      }
    );

    return array$;
  }

  pageDataWithSelected$(id$, pageData$, selected$) {
    // const userId$ = id$;
    const placelinePage$ = selected$.pipe(itemAsPage$());

    const newPageData$ = combineLatest(
      placelinePage$,
      id$,
      pageData$,
      (placelinePage: Page<any>, userId, pageData: Page<any>) => {
        if (!pageData) return pageData;
        let placelineResults = placelinePage ? placelinePage.results : null;
        const filteredData = _.filter(pageData.results, (user: any) => {
          return userId ? user.id == userId : true;
        });
        let results =
          placelineResults && userId ? placelineResults : filteredData;
        let count = userId ? 0 : pageData.count;
        return { ...pageData, results, count };
      }
    );

    return newPageData$;
  }

  getPageFromEntity(item$) {
    return item$;
  }
}
