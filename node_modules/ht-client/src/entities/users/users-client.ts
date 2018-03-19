import { UsersPlacelineClient } from "./users-placeline-client";
import { IDateRange, QueryLabel } from "../../interfaces";
import {
  AllData,
  ISegment,
  IUserAnalytics,
  IUserData,
  IUserListSummary,
  Partial
} from "ht-models";
import { UsersAnalyticsClient } from "./users-analytics-client";
import { Observable } from "rxjs/Observable";
import * as _ from "underscore";
import { EntityClient } from "../../base/entity-client";
import { UsersAnalyticsListAllClient } from "./users-analytics-markers";
import { htUser } from "ht-data";
import { DefaultUsersFilter } from "../../filters/users-filter";
import * as fromRoot from "../../reducers";
import { UsersSummaryClient } from "./users-summary-client";
import { DateRangeToQuery$ } from "ht-data";
import { ApiStoreService } from "../../global/store-provider";
import { filter } from "rxjs/operators/filter";
import { scan } from "rxjs/operators/scan";
import {pluck, flatMap, map, distinctUntilChanged, share} from "rxjs/operators";
import { combineLatest } from "rxjs/observable/combineLatest";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";
import {DateRange, dateRangeService} from "../../global/date-range";
import * as fromUsers from "../../reducers/user-reducer";
import * as fromSegments from "../../reducers/segments-reducer";
import {CombineLoadings$, DateRangeMap} from "ht-data";
import { UsersHeatmapClient } from "./users-heatmap-client";
import {HtApi} from "ht-api";

export class HtUsersClient extends EntityClient {
  analytics;
  placeline;
  analyticsAll;
  filterClass: DefaultUsersFilter = new DefaultUsersFilter();
  list;
  summary;
  listAll;
  heatmap;
  _statusQueryArray: QueryLabel[];
  store;
  api;
  key$;
  showAll: boolean = false;
  constructor(public options: IUsersClientConfig) {
    super();
    let api = new HtApi().users;
    this.key$ = ApiStoreService.getInstance().select(
      fromRoot.getAccountCurrentKey
    );
    this.api = api;
    const store = ApiStoreService.getNewInstance();
    store.addReducer("users", fromUsers.usersReducer);
    store.addReducer("segments", fromSegments.segmentsReducer);
    this.store = store;
    let dateRange = this.options.dateRange;
    let dateParam = 'recorded_at';
    this.analytics = new UsersAnalyticsClient({ dateRange, store, dateParam, api });
    this.placeline = new UsersPlacelineClient({ store, api });
    this.analyticsAll = new UsersAnalyticsListAllClient({
        dateRange,
      store,
      dateParam,
        api
    });
    this.summary = new UsersSummaryClient({ dateRange, store, dateParam, api });
    this.list = this.analytics;
    this.listAll = this.analyticsAll;
    this.heatmap = new UsersHeatmapClient({ dateRange, dateParam, api });
    this.initEffects();
  }

  getLoading$(): Observable<boolean> {
    return CombineLoadings$(this.list.loading$, this.summary.loading$);
  }

  set statusQueryArray(data: QueryLabel[]) {
    this._statusQueryArray = data;
    this.filterClass.customQueryArray = data;
  }

  setShowAll(showAll: boolean = true) {
    this.showAll = showAll;
    this.list.setQuery({ show_all: true });
  }

  getInitialDateRange(range: Partial<IDateRange> = {}): IDateRange {

    const initialRange = DateRangeMap.today;
    return { ...range, ...initialRange };
  }

  listStatusOverview$() {
    return this.summary.data$.pipe(
      map((summary: IUserListSummary) => {
        if (summary) {
          return summary.status_overview;
        }
        return null;
      })
    );
  }

  listStatusChart$(queryLabels?: QueryLabel[]) {
    // return status_overview.
    if (queryLabels) this.filterClass.customQueryArray.push(...queryLabels);
    return combineLatest(this.list.query$, this.listStatusOverview$()).pipe(
      map(([query, overview]) => {
        if (overview) {
          let total = 0;
          let statusTotal;
          let max = 0;
          let summaryEntity =
            queryLabels || this.filterClass.getStatusQueryArray(this.showAll);
          let status = query ? query["status"] : null;
          // let summaryEntity = this.filterClass.activityQueryArray;
          let values = _.map(summaryEntity, entity => {
            let sum = _.reduce(
              entity.values,
              (acc, key: string) => {
                return acc + overview[key];
              },
              0
            );
            let value = entity.value || 0 + sum;
            max = max && value < max ? max : value;
            total = total + value;
            return { ...entity, value };
          });
          let totalUsers = total;
          let hasSelected = false;
          let chart = _.map(values, datum => {
            let selected = false;
            if (status && status == datum.values.toString()) {
              selected = true;
              hasSelected = true;
            }
            let w = max ? datum.value / max : 0;

            return { ...datum, w, selected };
          });
          return { totalUsers, chart, hasSelected };
        }
        return null;
      })
    );
  }

  get queryLabel$() {
    let query$ = this.list.getBaseQuery$().pipe(filter(data => !!data));
    return query$.pipe(
      map(query => {
        // console.log("cl", query);
        let queryLabel = this.filterClass.getQueryLabel(query);
        return queryLabel;
      })
    );
  }

  get ordering$() {
    return this.list.getApiQuery$().pipe(
      filter(data => !!data),
      map(query => {
        let ordering = query ? query["ordering"] : null;
        let orderingMod = this.getOrderingMod(ordering);
        return {
          string: this.filterClass.sortingQueryMap[orderingMod.string],
          sign: orderingMod.sign
        };
      }),
      distinctUntilChanged()
    );
  }

  private getOrderingMod(ordering: string) {
    let string = ordering;
    let sign = 1;
    if (ordering.includes("-")) {
      string = ordering.substring(1);
      sign = 0;
    }
    return {
      string,
      sign
    };
  }

  getSegmentsStates() {
    return this.store.select(fromRoot.getSegmentsState);
  }

  getCurrentPlaceline$() {
    return combineLatest(
      this.placeline.data$,
      this.getSegmentsStates(),
      (userData: IUserData, { selectedId, resetMapId }) => {
        if (userData && (selectedId || resetMapId)) {
          const id = selectedId || resetMapId;
          let segments = _.filter(userData.segments, (segment: ISegment) => {
            return segment.id === id;
          });
          userData = {
            ...userData,
            segments: segments,
            events: [],
            actions: []
          };
        }
        return userData;
      }
    );
  }

  private initEffects() {
    this.list.query$.pipe(filter(data => !!data)).subscribe(query => {
      this.setListAllFilter(query);
    });

    // this.listAll.active$.pipe(filter(data => !!data)).flatMap(() => {
    //   return this.listStatusChart$()
    // })
    //   .takeUntil(this.listAll.active$.filter(data => !data).skip(1))
    //   .withLatestFrom(this.list.query$)
    //   .switchMap(([statusOverview, query]) => {
    //     // return Observable.of({})
    //     console.log(statusOverview, query);
    //     return this.getListAllUpdateQuery$(statusOverview, query)
    //   })//todo finish this

    this.placeline.id$
      .pipe(
        scan(
          (
            acc: { isSame: boolean; oldId: string | null },
            currentId: string
          ) => {
            let isSame = acc.oldId === currentId;
            let oldId = currentId;
            return { isSame, oldId };
          },
          { isSame: false, oldId: null }
        ),
        pluck("isSame"),
        filter(data => !data)
      )
      .subscribe((isDiff: boolean) => {
        this.placeline.setData(null);
      });
  }

  setListAllFilter(query) {
    let statusString = query["status"];
    let search = query["search"];
    let ids = query["id"];
    let userMarkerFilters: ((users) => any)[] = [];

    if (statusString) {
      let statusArray = statusString.split(",");
      // this.updateUserMap(query);
      let statusFilter: any[] = [];
      statusArray.forEach(status => {
        statusFilter.push(htUser().getMarkerFilter(status));
      });
      let allStatusFilter = user => {
        return _.reduce(
          statusFilter,
          (acc, filter: (user) => boolean) => {
            return acc || filter(user);
          },
          false
        );
      };

      userMarkerFilters.push(allStatusFilter);
    }
    if (search) {
      userMarkerFilters.push((user: IUserAnalytics) => {
        return htUser().getMarkerSearched(search)(user); // || userMarkerFilter(user)
      });
      // this.updateUserMap(query);
    }
    if (ids) {
      let userIds = ids.split(",");
      userMarkerFilters.push((user: IUserAnalytics) => {
        return _.contains(userIds, user.id);
      });
    }
    let userMarkerFilter = user => {
      return _.reduce(
        userMarkerFilters,
        (acc, filter: (user) => boolean) => {
          return acc && filter(user);
        },
        true
      );
    };

    let dataMap = (allResults: AllData<any>) => {
      let results = _.filter(allResults.resultsEntity, userMarkerFilter);
      let resultsEntity = _.indexBy(results, "id");
      return { ...allResults, resultsEntity };
    };
    this.listAll.setDataMap(dataMap);
  }

  getListAllUpdateQuery$(overview, query) {
    return this.listAll.data$.pipe(
      flatMap((allData: AllData<any>) => {
        let results = _.values(allData.resultsEntity);
        let currentTotalUsers = results.length;
        let { totalUsers, chart } = overview;
        let status = query["status"];
        if (!!status) {
          let value = _.find(chart, (datum: any) => {
            return datum.keys.toString(",") == status;
          });
          return value && value !== currentTotalUsers ? of(true) : empty();
        } else if (currentTotalUsers < totalUsers) {
          return of(true);
        }
        return empty();
      })
    );
  }
}

export const usersClientFactory = (
  options: Partial<IUsersClientConfig> = {}
) => {
  let dateRange: DateRange = options.dateRange || dateRangeService.getInstance();
  return new HtUsersClient({ dateRange });
};

export interface IUsersClientConfig {
  dateRange: DateRange;
}

export interface IUsersSummaryData {
  totalUsers: number,
  hasSelected: boolean,
  chart: IUsersSummaryChart[]
}

export interface IUsersSummaryChart {
  label: string
  color: string,
  selected: boolean,
  value: number,
  values: string[],
  w: number
}
