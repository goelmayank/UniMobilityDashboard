import {listQueryMixin} from "../../mixins/entity-query";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin} from "../../mixins/get-data";
import {EntityAllItemsClient} from "../../base/all-items.client";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {AllowedQueryMap, IAllowedQueryMap} from "ht-data";
import {IAction, AllData, Page} from "ht-models";
import {IPageClientConfig} from "../../interfaces";
import {DateRange} from "../../global/date-range";

export class ActionsIndexAll extends EntityAllItemsClient {
  dataBehaviour$: BehaviorSubject<AllData<IAction> | null> = new BehaviorSubject(null);
  loadingBehaviour$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingBehaviour$.asObservable();
  activeBehaviour$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  query$: BehaviorSubject<object>;
  api$: (query) => Observable<Page<IAction>>;
  dataSub: Subscription;
  dataEntities$;
  dateParam: string;
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig) {
    super();
    this.api$ = (query) => api.allPages(api.index(query));
    this.dateRange = dateRange;
    this.dateParam = dateParam;
    this.query$ = new BehaviorSubject(this.getDefaultQuery());
    this.active$ = this.activeBehaviour$.asObservable();
  }

  setActive(isActive: boolean = true) {
    this.activeBehaviour$.next(isActive)
  }

  setQuery(query) {
    this.query$.next(query)
  }

  get data$() {
    return this.dataBehaviour$.asObservable()
  }
  addData(data) {
    this.dataBehaviour$.next(data)
  };

  setData(data) {
    this.dataBehaviour$.next(data)
  }

  setLoading(loading) {

  }
};

export const ActionsIndexAllClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsIndexAll)))
);