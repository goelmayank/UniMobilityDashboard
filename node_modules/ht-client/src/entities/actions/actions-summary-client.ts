import {EntityListClient} from "../../base/list-client";
import {IPageClientConfig} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Observable} from "rxjs/Observable";
import {IActionsSummary} from "ht-models";
import {Subscription} from "rxjs/Subscription";
import * as fromActions from "../../dispatchers/actions-dispatcher";
import {listQueryMixin} from "../../mixins/entity-query";
import {getQueryDataMixin} from "../../mixins/get-data";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {clientSubMixin} from "../../mixins/client-subscription";
import {IAllowedQueryMap} from "ht-data";
import {ActionsFilter} from "../../filters/actions-filter";
import {map} from "rxjs/operators";
import {DateRange} from "../../global/date-range";

export class ActionsSummary extends EntityListClient {
  store;
  data$: Observable<IActionsSummary>;
  loading$: Observable<boolean>;
  dataSub: Subscription;
  api$: (query) => Observable<IActionsSummary>;
  allowedQueryMap: IAllowedQueryMap[] = [
    {
      key: "show_all",
    },
    {
      key: "search"
    }
  ];
  updateStrategy = 'live';
  // updateStrategy = 'once';
  filter = new ActionsFilter();
  summaryChart$;
  dateParam: string;
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig) {
    super();
    this.api$ = query => api.summary(query);
    this.dateRange = dateRange;
    this.store = store;
    this.dateParam = dateParam;
    this.query$ = this.store.select(fromRoot.getActionsSummaryQuery);
    this.active$ = this.store.select(fromRoot.getActionsSummaryActive);
    this.data$ = this.store.select(fromRoot.getActionsSummary);
    this.summaryChart$ = this.getSummaryChart();
    this.loading$ = this.store.select(fromRoot.getActionsSummaryLoading);
  }

  setActive(isActive: boolean | string = true) {
    isActive = isActive ? new Date().toISOString() : isActive;
    this.store.dispatch(new fromActions.SetSummaryActive(isActive))
  }

  setLoading(loading) {
    this.store.dispatch(new fromActions.SetSummaryLoading(loading))
  };

  setData(data: IActionsSummary) {
    this.store.dispatch(new fromActions.SetSummary(data));
  }

  setQuery(query) {
    this.store.dispatch(new fromActions.SetSummaryQuery(query))
  };

  getSummaryChart() {
    return this.data$.pipe(
      map((summaryData) => {
        return this.filter.summaryCharts(this.filter.statusQueryArray, summaryData)
      })
    )
  }

};

export const ActionsSummaryClient = clientSubMixin(
  getQueryDataMixin(getFirstDataMixin(listQueryMixin(ActionsSummary)))
);


