import { EntityClient } from "../../base/entity-client";
import { GroupsListClient } from "./groups-list";
import { GroupsItemClient } from "./groups-item-client";
import { Store } from "../../store/store";
import * as fromRoot from "../../reducers";
import { ApiStoreService } from "../../global/store-provider";
import { Observable } from "rxjs/Observable";
import { IDateRange } from "../../interfaces";
import { map } from "rxjs/operators";
import {DateRange, dateRangeService} from "../../global/date-range";
import {HtApi, HtGroupsApi} from "ht-api";
import * as fromGroups from "../../reducers/groups-reducer";
import { Page, IGroup } from "ht-models";

export class HtGroupsClient extends EntityClient {
  list;
  item;
  api: HtGroupsApi;
  store: Store<fromRoot.State>;
  constructor(options = {}) {
    super();
    let api = new HtApi().groups;
    this.api = api;
    const store = ApiStoreService.getNewInstance();
    store.addReducer("groups", fromGroups.groupsReducer);
    this.store = store;

    this.list = new GroupsListClient({ store, api });

    this.item = new GroupsItemClient({ store, api });
  }

  key$(id) {
    return this.api.get(id).pipe(
      map(group => {
        return group["token"];
      })
    );
  }

  lookupIdKey$(lookupId): Observable<any> {
    return this.api.index({ lookup_id: lookupId }).pipe(
      map(groupPage => {
        return groupPage && groupPage["results"]
          ? groupPage["results"][0]["token"]
          : null;
      })
    );
  }

  getChildren(groupId: string): Observable<Page<IGroup>> {
    const query = { parent_group_id: groupId };
      return this.getAll(query)
  }

  getRoot(): Observable<Page<IGroup>> {
    const query = { has_parent: false };
    return this.getAll(query)
  }

  getAll(query) {
    return this.api.allPages(this.api.index(query))
  }
}

export const groupsClientFactory = (
  options: Partial<IGroupClientConfig> = {}
) => {
  let dateRange = options.noDateRange
    ? null
    : options.dateRange || dateRangeService.getInstance();
  return new HtGroupsClient({ dateRange });
};

export interface IGroupClientConfig {
    dateRange: DateRange;
  noDateRange: boolean;
}
