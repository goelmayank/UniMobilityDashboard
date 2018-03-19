import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {DateRange} from "../global/date-range";

export abstract class EntityListClient {
  //listGetData
  updateStrategy = "live";
  pollDuration = 10000;
  // api$;
  name = "list";
  query$;
  dateRange?: DateRange;
  // allowedQueryKeys: string[] | null = null;
  // defaultQuery;
  active$?: Observable<boolean>;
  // apiQuery$;
  // apiParams$;
  getApiParams$: () => Observable<any[]>;
  getApiQuery$: () => Observable<any>;
  // init: () => void;
  // getData$: (data) => any;
  // dataSub: Subscription;

  firstDataEffect(data) {
    this.setLoading(false);
  }

  getDefaultQuery(): object {
    return { page_size: 10 };
  }

  get apiParams$() {
    return this.getApiParams$();
  }
  get apiQuery$() {
    return this.getApiQuery$();
  }

  abstract setLoading(data);
  //
  // setData(data) {
  //
  // };
  //
  // setActive(isActive: boolean = true){
  //
  // }
}
