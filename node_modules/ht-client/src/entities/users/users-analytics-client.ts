import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import { Observable } from "rxjs/Observable";
import { getPageDataMixin } from "../../mixins/get-data";
import { IUserAnalytics, Page } from "ht-models";
import { listQueryMixin } from "../../mixins/entity-query";
import { clientSubMixin } from "../../mixins/client-subscription";
import { EntityListClient } from "../../base/list-client";
import { PageResults$ } from "ht-data";
// import { entityApi } from "../../global/entity-api";
import { IPageClientConfig } from "../../interfaces";
import { Subscription } from "rxjs/Subscription";
import { getFirstDataMixin } from "../../mixins/get-first-data";
import { IAllowedQueryMap } from "ht-data";
import {HtApi, HtUsersApi} from "ht-api";
import {DateRange} from "../../global/date-range";

export class UsersAnalytics extends EntityListClient {
  // updateStrategy = 'update';
  api$: (query) => Observable<Page<IUserAnalytics>>;
  name = "users analytics list";
  defaultQuery = { ordering: "-last_heartbeat_at" };
  dataSub: Subscription;
  // allowedQueryKeys = null;
  // active$ = store.select(fromRoot.getUsersAnalyticsIsActive);
  data$: Observable<Page<IUserAnalytics>>;
  dataArray$: Observable<IUserAnalytics[] | null>;
  id$: Observable<string | null>;
  loading$: Observable<boolean | string>;
  store;
  dateParam;
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig) {
    super();
    this.api$ = (query): Observable<Page<IUserAnalytics>> =>
        api.analytics(query);
    this.dateRange = dateRange;
    this.store = store;
    this.query$ = this.store.select(fromRoot.getUsersListQuery) as Observable<
      object | null
    >;
    this.dateParam = dateParam;
    this.active$ = this.store.select(
      fromRoot.getUsersAnalyticsIsActive
    ) as Observable<boolean>;
    this.data$ = this.store.select(fromRoot.getUsersAnalyticsPage);
    this.id$ = this.store.select(fromRoot.getUsersListId);
    this.loading$ = this.store.select(fromRoot.getUsersAnalyticsLoading);
    this.dataArray$ = this.data$.pipe(PageResults$);
    // this.init()
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), ...this.defaultQuery };
    // return {...this.defaultQuery}
  }

  firstDataEffect() {
    this.setLoading(false);
  }

  setLoading(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsLoading(data));
  }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data));
  }

  setActive(isActive: boolean | string = true) {
    isActive = isActive ? new Date().toISOString() : isActive;
    this.store.dispatch(new fromUsersDispatcher.SetListActive(isActive));
  }

  get apiQuery$() {
    return this.getApiQuery$();
  }

  addQuery(query = {}) {
    this.store.dispatch(new fromUsersDispatcher.AddListQuery(query));
  }

  setQuery(query = {}) {
    this.store.dispatch(new fromUsersDispatcher.SetListQuery(query));
  }
  setQueryReset(query) {
    this.store.dispatch(
      new fromUsersDispatcher.AddListQuery({ ...query, page: null })
    );
  }
  clearQueryKey(key: string) {
    this.store.dispatch(new fromUsersDispatcher.ClearQueryKey(key));
  }
  toggleId(userId: string) {
    this.store.dispatch(new fromUsersDispatcher.ToggleUsersListId(userId));
  }
  setId(userId: string | null) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersListId(userId));
  }

  clearData() {
    this.setData(null);
    this.setActive(false)
    this.setQuery({});
  }

  destroy() {
    this.clearData();
    this.dataSub.unsubscribe();
  }
}

export const UsersAnalyticsClient = clientSubMixin(
  getPageDataMixin(getFirstDataMixin(listQueryMixin(UsersAnalytics)))
);

// applyMixins(UsersAnalytics, [ListGetData, ListQuery, ClientSub]);
