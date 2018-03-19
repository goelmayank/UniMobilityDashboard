import {Observable} from "rxjs/Observable";
import {IDateRange} from "../../interfaces";
import {DateRange, dateRangeService} from "../../global/date-range";
import {ActionsGraphClient} from "./actions-graph";
import { DateRangeToQuery$ } from "ht-data";
import * as fromActions from "../../reducers/actions-reducer";
import {ApiStoreService} from "../../global/store-provider";
import {ActionsListClient} from "./actions-list-client"
import {ActionsSummaryClient} from "./actions-summary-client"
import {ActionsFilter} from "../../filters/actions-filter";
import {ActionsHeatmapClient} from "./actions-heatmap-client";
import {ActionsIndexAllClient} from "./actions-list-all-client"
import {HtApi} from "ht-api";

export class HtActionsClient {
  // item: HtActionsGetClient;
  api;
  graph;
  store;
  list;
  listAll;
  summary;
  heatmap;
  filters = new ActionsFilter();
  constructor(config: IActionsClientConfig) {
    let api = new HtApi().actions;
    this.api = api;
    const store = ApiStoreService.getNewInstance();
    store.addReducer("actions", fromActions.actionsReducer);
    this.store = store;
    let dateRange = config.dateRange;
    let dateParam = 'created_at';
    this.graph = new ActionsGraphClient({dateRange, dateParam, api});
    this.list = new ActionsListClient({dateRange, store, dateParam, api});
    this.listAll = new ActionsIndexAllClient({dateRange, dateParam, api});
    this.summary = new ActionsSummaryClient({dateRange, store, dateParam, api});
    this.heatmap = new ActionsHeatmapClient({dateRange, dateParam: 'completed_at', api});
  }
}

export const actionsClientFactory = (
  options: Partial<IActionsClientConfig> = {}
) => {
  let dateRange = options.dateRange || dateRangeService.getInstance();
  return new HtActionsClient({ dateRange });
};

export interface IActionsClientConfig {
    dateRange: DateRange;
}
