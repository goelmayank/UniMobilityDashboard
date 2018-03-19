import { itemQueryMixin, listQueryMixin } from "../../mixins/entity-query";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { clientSubMixin } from "../../mixins/client-subscription";
import { getIdQueryDataMixin, getPageDataMixin } from "../../mixins/get-data";
import { Subscription } from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as fromAccount from "../../dispatchers/accounts-dispatcher";
import { IPageClientConfig } from "../../interfaces";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { getFirstDataMixin } from "../../mixins/get-first-data";
import { EntityAllItemsClient } from "../../base/all-items.client";
import { AllData, Page, IMembership } from "ht-models";
import { listAllClientSubMixin } from "../../mixins/list-all-client-sub";
import {HtAccountUserApi } from "ht-api";

export class MembershipsAll {
  query$: Observable<object> = of({});
  updateStrategy = "once";
  pollDuration = 10000;
  active$ = of(true);
  api$: (id, query) => Observable<Page<IMembership>>;
  store;
  data$;
  id$;
  loading$: BehaviorSubject<string | boolean> = new BehaviorSubject(false);
  constructor({ dateParam, store, api }: IPageClientConfig<HtAccountUserApi>) {
    this.api$ = (id, query) => api.membershipsAll(id, query);
    this.store = store;
    // this.active$ = this.store.select(fromRoot.getUsersAnalyticsIsActive);
    this.data$ = this.store.select(fromRoot.getAccountMembershipsAll);
    this.id$ = this.store.select(fromRoot.getAccountUserId);
    // this.loading$ = this.store.select(fromRoot.getAccountCurrentKey);
    // this.init()
  }

  firstDataEffect() {
    this.setLoading();
  }

  getDefaultQuery() {
    return { page_size: 100 };
  }

  setLoading(loading: string | boolean = true) {
    this.loading$.next(loading);
  }

  addData(data) {
    this.store.dispatch(new fromAccount.SetMembershipsAll(data));
  }
}

export const MemberShipsClient = listAllClientSubMixin(
  getIdQueryDataMixin(getFirstDataMixin(itemQueryMixin(MembershipsAll)))
);
