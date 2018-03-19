import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import { Observable } from "rxjs/Observable";
import { EntityListClient } from "../../base/list-client";
import { clientSubMixin } from "../../mixins/client-subscription";
import { listQueryMixin } from "../../mixins/entity-query";
import { getQueryDataMixin } from "../../mixins/get-data";
// import {HtApi, HtUsersApi} from "ht-api";
import { IPageClientConfig } from "../../interfaces";
import { IUserListSummary } from "ht-models";
import { Subscription } from "rxjs/Subscription";
import { getFirstDataMixin } from "../../mixins/get-first-data";
import { IAllowedQueryMap } from "ht-data";
import {DateRange} from "../../global/date-range";

export class UsersSummary extends EntityListClient {
  name = "users summary";
  defaultQuery = { page_size: null };
  updateStrategy = "live";
  allowedQueryKeys = ["show_all", "search"];
  data$: Observable<IUserListSummary>;
  loading$: Observable<boolean>;
  store;
  allowedQueryMap: IAllowedQueryMap[] = [
    {
      key: "show_all",
    },
    {
      key: "search"
    }
  ];
  dataSub: Subscription;
  dateParam: string;
  api$: (query) => Observable<IUserListSummary>;

  setActive(isActive: boolean | string = true) {
    isActive = isActive ? new Date().toISOString() : isActive;
    this.store.dispatch(new fromUsersDispatcher.SetSummaryActive(isActive));
  }
  setData(usersSummary) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersSummary(usersSummary));
  }
  setLoading(data) {
    this.store.dispatch(new fromUsersDispatcher.SetSummaryLoading(data));
  }
  setQuery(query) {}

  clearData() {
    this.setData(null);
  }

  constructor({ dateRange, store, dateParam, api }: IPageClientConfig) {
    super();
    this.api$ = query => api.summary(query);
    this.dateRange = dateRange;
    this.store = store;
    this.dateParam = dateParam;
    this.query$ = this.store.select(fromRoot.getUsersListQuery);
    this.active$ = this.store.select(fromRoot.getUsersSummaryActive);
    this.data$ = this.store.select(fromRoot.getUsersSummary);
    this.loading$ = this.store.select(fromRoot.getUsersSummaryLoading);
  }

  destroy() {
    this.clearData();
    this.setActive(false);
    this.dataSub.unsubscribe();
  }
}

export const UsersSummaryClient = clientSubMixin(
  getQueryDataMixin(getFirstDataMixin(listQueryMixin(UsersSummary)))
);
