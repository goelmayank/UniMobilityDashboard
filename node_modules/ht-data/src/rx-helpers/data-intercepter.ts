import { combineLatest } from "rxjs/observable/combineLatest";
import { Observable } from "rxjs/Observable";
import _ from "underscore";
import { Page } from "ht-models";
import { distinctUntilChanged } from "rxjs/operators";
import { itemAsPage$ } from "./item-as-page";

export const dataWithSelectedId$ = (
  data$,
  id$,
  keys: string[],
  prop: string
): Observable<any> => {
  return combineLatest(data$, id$, (data, id) => {
    if (!data && keys.length) return data;
    const allItems = keys.reduce((items, key) => {
      return [...items, ...data[key]]
    }, []);
    let selected = allItems.find((item) => {
      return item.id === id;
    });
    return {
      ...data,
      [prop]: selected
    }
  });
};

export const listwithSelectedId$ = (list$, id$): Observable<any> => {
  return combineLatest(
    list$,
    id$.pipe(distinctUntilChanged()),
    (list: Page<any>, id) => {
      if (!list) return list;
      return !id
        ? list
        : {
            count: 1,
            next: null,
            page: null,
            results: list.results.filter(item => {
              return item.id === id;
            })
          };
    }
  );
};

export const listWithItem$ = (list$, item$) => {
  return combineLatest(list$, item$.pipe(itemAsPage$()), (list, itemPage) => {
    return itemPage ? itemPage : list;
  });
};
