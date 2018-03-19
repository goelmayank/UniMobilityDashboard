import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { applyBaseMixins, applyMixins } from "../helpers/mix";

export abstract class EntityItemClient {
  //listGetData
  updateStrategy = "live";
  pollDuration = 10000;
  // api$;
  name = "item";
  id$: Observable<null | string>;
  query$: Observable<object>;
  allowedQueryKeys = null;
  dateRangeQuery$;
  // active$ = null;
  // apiQuery$;
  // apiParams$;
  getApiParams$: () => Observable<any[]>;
  getApiQuery$: () => Observable<any>;
  // init: () => void;
  // getData$: (data) => any;

  firstDataEffect() {
    this.setLoading(false);
  }
  getDefaultQuery(): object {
    return {};
  }
  get apiParams$() {
    return this.getApiParams$();
  }
  get apiQuery$() {
    return this.getApiQuery$();
  }

  dataSub: Subscription;

  abstract setLoading(data);

  // setData(data) {
  //
  // };

  // setActive(isActive: boolean = true){
  //
  // }
}
