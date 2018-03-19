import {EntityListClient} from "../../base/list-client";
import {IPageClientConfig} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Observable} from "rxjs/Observable";
import {PageResults$} from "ht-data";
import {Page, IAction} from "ht-models";
import * as fromAction from "../../dispatchers/actions-dispatcher"
import {listQueryMixin} from "../../mixins/entity-query";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {clientSubMixin} from "../../mixins/client-subscription";
import {getPageDataMixin} from "../../mixins/get-data";
import {Subscription} from "rxjs/Subscription";
import { IAllowedQueryMap } from "ht-data";
import {DateRange} from "../../global/date-range";

export class ActionsList extends EntityListClient {
  store;
  data$: Observable<Page<IAction>>;
  loading$: Observable<boolean | string>;
  dataArray$: Observable<IAction[] | null>;
  api$: (query) => Observable<Page<IAction>>;
  dataSub: Subscription;
  dateParam: string;
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig) {
    super();
    this.api$ = (query): Observable<Page<IAction>> =>
        api.index(query);
    this.dateRange = dateRange;
    this.store = store;
    this.query$ = this.store.select(fromRoot.getActionsListQuery) as Observable<
      object | null
      >;
    this.dateParam = dateParam;
    this.active$ = this.store.select(
      fromRoot.getActionsListActive
    ) as Observable<boolean>;
    this.data$ = this.store.select(fromRoot.getActionsList);
    this.loading$ = this.store.select(fromRoot.getActionsListLoading);
    this.dataArray$ = this.data$.pipe(PageResults$);
    // this.init()
  }

  setActive(active = true) {
    this.store.dispatch(new fromAction.SetListActive(active))
  }

  setLoading(loading) {
    this.store.dispatch(new fromAction.SetListLoading(loading))
  };

  setData(data) {
    this.store.dispatch(new fromAction.SetList(data))
  };

  setQuery(query) {
    this.store.dispatch(new fromAction.SetListQuery(query))
  }
};

export const ActionsListClient = clientSubMixin(
  getPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsList)))
);
