import { IUserAnalytics, Page, AllData } from "ht-models";
import { ApiType, IPageClientConfig } from "../../interfaces";
import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import { Observable } from "rxjs/Observable";
import { EntityAllItemsClient } from "../../base/all-items.client";
import { htUser, IAllowedQueryMap } from "ht-data";
import { getAllPageDataMixin } from "../../mixins/get-data";
import { listQueryMixin } from "../../mixins/entity-query";
import { clientSubMixin } from "../../mixins/client-subscription";
import { empty } from "rxjs/observable/empty";
import {HtApi, HtUsersApi} from "ht-api";
import { Subscription } from "rxjs/Subscription";
import { getFirstDataMixin } from "../../mixins/get-first-data";
import { listAllClientSubMixin } from "../../mixins/list-all-client-sub";
import {DateRange} from "../../global/date-range";

export class UsersAnalyticsListAll extends EntityAllItemsClient {
  data$: Observable<Page<IUserAnalytics>>;
  loading$: Observable<boolean>;
  id$ = empty();
  allowedQueryKeys = ["status", "show_all", "search"];
  name = "users analytics all";
  api$: (query) => Observable<Page<IUserAnalytics>>;
  defaultQuery = {};
  store;
  dataArray$;
  dataEntities$: Observable<AllData<any>>;
  allowedQueryMap: IAllowedQueryMap[] = [
    {
      key: "status",
      filter: (value, oldValue) => !!value
    },
    {
      key: "show_all",
      filter: (value, oldValue) => {
        if(!value) this.clearData();
        return true
      }
    }
  ];
  dataSub: Subscription;
  dateParam: string;
  constructor({ dateRange, store,dateParam, api }: IPageClientConfig) {
    super();
    this.api$ = query => api.allPages(api.analytics(query));
    this.dateRange = dateRange;
    this.store = store;
    this.query$ = this.store.select(fromRoot.getUsersListQuery) as Observable<
      object | null
    >;
    this.dateParam = dateParam;
    this.active$ = this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive);
    this.dataEntities$ = this.store.select(
      fromRoot.getUsersAnalyticsFilteredMarker
    );
    // this.id$ = this.store.select(fromRoot.getQueryUserId);
    this.loading$ = this.store.select(fromRoot.getUsersAnalyticsAllLoading);
    // this.dataArray$ = this.data$.pipe(PageResults$);
    // this.init()
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), ...this.defaultQuery };
    // return {...this.defaultQuery}
  }

  firstDataEffect(data) {
    if (!data.next) this.setLoading(false);
  }

  setActive(isActive: boolean | string = true) {
    isActive = isActive ? new Date().toISOString() : isActive;
    this.store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive));
  }

  addData(data: Page<IUserAnalytics>) {
    data = data || { results: [], next: "no_next", count: 0, previous: "" };
    this.store.dispatch(new fromUsersDispatcher.AddUsersAnalyticsAll(data));
  }

  setData(data: Page<IUserAnalytics>) {
    data = data || { results: [], next: "no_next", count: 0, previous: "" };
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data));
  }

  setLoading(data) {
    this.store.dispatch(
      new fromUsersDispatcher.SetUsersAnalyticsAllLoading(data)
    );
  }

  setDataMap(mapFunc) {
    this.store.dispatch(
      new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc)
    );
  }

  isValidMarker(marker) {
    return htUser(marker).isValidMarker();
  }

  clearData() {
    let nullData = { results: [], next: "no_next", count: 0, previous: "" };
    this.setData(nullData);
  }

  destroy() {
    this.clearData();
    this.setActive(false)
    this.dataSub.unsubscribe();
  }
}
export const UsersAnalyticsListAllClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(UsersAnalyticsListAll)))
);
