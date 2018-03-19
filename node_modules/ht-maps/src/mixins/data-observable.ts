import { Constructor } from "../interfaces";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
// import { GlobalMap } from "../global/map-service";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { filter } from "rxjs/operators/filter";
import { map } from "rxjs/operators/map";
import { pluck } from "rxjs/operators/pluck";
import { scan } from "rxjs/operators/scan";
import * as _ from "underscore";
import { HtPosition } from "ht-models";
import { combineLatest } from "rxjs/observable/combineLatest";
import { AllData, Page } from "ht-models";
import {MapInstance} from "../map-utils/map-instance";

export interface IMarkersArray {
  valid: any[];
  invalid: any[];
  isNew: boolean;
}

export interface IDataObservableBase {
  trace: (data, map?) => any;
  isValidMapItems?: (data) => boolean;
  getPosition: (data) => HtPosition;
  mapInstance: MapInstance
}
export function DataObservableMixin<
  TBase extends Constructor<IDataObservableBase>>(Base: TBase) {
  return class extends Base {
    dataSub: Subscription;
    dataPageSource$: Observable<Page<any>>;
    dataArraySource$: Observable<any[]>;
    data$: Observable<IMarkersArray>;

    constructor(...args: any[]) {
      super(...args);
      this.mapInstance.addToItemsSet(this)
    }

    _procData$() {
      return (source$: Observable<Page<any>>) => {
        return source$.pipe(
          filter(data => !!data),
          map(pageData => {
            let isNew = pageData && pageData.count && !pageData.previous;
            let results = pageData ? pageData.results : [];
            return this.getMarkersArray(results, isNew);
          })
        );
      };
    }

    getMarkersArray(array: any[], isNew: boolean = false) {
      return _.reduce(
        array,
        (acc, item) => {
          const isValid = this.isValidMapItems
            ? this.isValidMapItems(item)
            : !!this.getPosition(item);
          if (isValid) {
            acc.valid.push(item);
          } else {
            acc.invalid.push(item);
          }
          return acc;
        },
        { valid: [], invalid: [], isNew }
      );
    }

    setPageData$(
      data$: Observable<Page<any> | null>,
      config: SetDataConfig = {}
    ) {
      //todo take page data, add diff apis
      if (this.dataSub) {
        this.dataSub.unsubscribe();
      }
      const hide$ = config.hide$;
      this.dataPageSource$ = hide$
        ? combineLatest(
            data$,
            hide$.pipe(distinctUntilChanged()),
            (data, hide) =>
              !!hide ? { results: [], count: 0, next: "", previous: "" } : data
          )
        : data$;
      this.data$ = this.dataPageSource$.pipe(this._procData$());
      this._initDataObserver();
    }

    setData$(data$: Observable<any[]>, config: SetDataConfig = {}) {
      if (this.dataSub) {
        this.dataSub.unsubscribe();
      }
      interface ScanData {
        new: any[],
        old: any[]
      };
      const hide$ = config.hide$;
      this.dataArraySource$ = hide$
        ? combineLatest(
            data$,
            hide$.pipe(distinctUntilChanged()),
            (data, hide) => (!!hide ? [] : data)
          )
        : data$;
      this.data$ = this.dataArraySource$.pipe(
        scan((acc: ScanData, data: any[]) => {
          return {new: data, old: acc.new}
        }, {old: null, new: null}),
        map((dataArray: ScanData) => {
          return this.getMarkersArray(dataArray.new, !dataArray.old);
        })
      );
      this._initDataObserver();
    }

    // _initData$() {
    //   let userData$ = this.dataPageSource$.pipe(
    //     filter(data => !!GlobalMap.map),
    //     pluck('valid'),
    //     scan((acc: {user: any, oldUser: any}, data: object) => {
    //       const oldUser = acc.user;
    //       return {user: data, oldUser }
    //     }, {user: null, oldUser: null})
    //   );
    //   return userData$;
    // };

    _initDataObserver() {
      let mapData$ = this.data$.pipe(filter(data => !!this.mapInstance.map));
      let render$ = combineLatest(
        mapData$,
        this.mapInstance.map$.pipe(
          filter(data => !!data)
        ),
        (mapData, map) => mapData
      );
      // function isNewId (newItem, old) {
      //   if(!old && newItem) return true;
      //   if(newItem && old) return  newItem.id !== old.id
      // }
      // function isNewList(newList, old) {
      //   if(!old && newList) return true;
      //   if(newList && old) return !newList.next && newList.count
      // }
      let sub = render$.subscribe(({ valid, invalid, isNew }) => {
        this.trace(valid);
        if (isNew) this.mapInstance.resetBounds();
      });
      this.dataSub = sub;
    }

    clear() {
      this.dataSub.unsubscribe();
    }
  };
}

export interface SetDataConfig {
  hide$?: Observable<any>;
}
