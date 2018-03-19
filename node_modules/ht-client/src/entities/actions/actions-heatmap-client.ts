import {listQueryMixin} from "../../mixins/entity-query";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin} from "../../mixins/get-data";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IActionHeat, Page} from "ht-models"
import {IAllowedQueryMap, PageResults$} from "ht-data";
import {Subscription} from "rxjs/Subscription";
import {IPageClientConfig} from "../../interfaces";
import {DateRange} from "../../global/date-range";

export class ActionsHeatmap {
  query$: Observable<object> = of({});
  api$: (query) => Observable<Page<IActionHeat>>;
  loadingState$ = new BehaviorSubject(false);
  loading$ = this.loadingState$.asObservable();
  dataState$: BehaviorSubject<Page<IActionHeat> | null> = new BehaviorSubject(null);
  data$ = this.dataState$.asObservable();
  dataSub: Subscription;
    dateRange: DateRange;
  active$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataArray$ = this.data$.pipe(PageResults$);
  dateParam: string;

  constructor({ dateRange, dateParam, api }: IPageClientConfig) {
    this.api$ = query => api.allPages(api.heatmap(query));
    this.dateRange = dateRange;
    this.dateParam = dateParam;
  }

  setActive(active = true) {
    this.active$.next(active)
  }

  getDefaultQuery() {
    return {page_size: 300}
  };

  firstDataEffect(data) {
    if ((data && !data.next) || !data) {
      this.setLoading(false);
    }
  }

  setLoading(isLoading: boolean) {
    this.loadingState$.next(isLoading)
  }

  setData(data: Page<IActionHeat>) {
    this.dataState$.next(data)
  }

  addData(data) {
    this.dataState$.next(data)
  }

}

export const ActionsHeatmapClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsHeatmap)))
);