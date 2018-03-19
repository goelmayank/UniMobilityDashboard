import * as fromRoot from "../../reducers";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import { Observable } from "rxjs/Observable";
import * as _ from "underscore";
import { EntityItemClient } from "../../base/item-client";
import { getIdQueryDataMixin } from "../../mixins/get-data";
import { itemQueryMixin } from "../../mixins/entity-query";
import { clientSubMixin } from "../../mixins/client-subscription";
import {HtApi, HtUsersApi} from "ht-api";
import { dataWithSelectedId$ } from "ht-data";
import { IClientConfig } from "../../interfaces";
import { Subscription } from "rxjs/Subscription";
import { IUserData } from "ht-models";
import { getFirstDataMixin } from "../../mixins/get-first-data";

export class UsersPlaceline extends EntityItemClient {
  name = "users placeline";
  updateStrategy = "live";
  api$: (id, query) => Observable<IUserData>;
  store;
  data$;
  loading$;
  segmentsState$;
  segmentSelectedId$;
  segmentResetId$;

  constructor({ store, api }: IClientConfig) {
    super();
    this.api$ = (id, query) => api.placeline(id, query);
    this.store = store;
    this.query$ = this.store.select(fromRoot.getUsersPlacelineQuery);
    this.data$ = this.store.select(fromRoot.getUsersUsersData);
    this.loading$ = this.store.select(fromRoot.getUsersPlacelineLoading);
    this.id$ = this.store.select(fromRoot.getUsersPlacelineId);
    this.segmentsState$ = this.store.select(fromRoot.getSegmentsState);
    this.segmentSelectedId$ = this.store.select(fromRoot.getSegmentsSelectedId);
    this.segmentResetId$ = this.store.select(fromRoot.getSegmentsResetMapId);
    // this.init()
  }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUserData(data));
  }
  setLoading(data) {
    this.store.dispatch(new fromUsersDispatcher.SetPlacelineLoading(data));
  }
  setId(id) {
    this.store.dispatch(new fromUsersDispatcher.SetPlacelineId(id));
  }
  toggleId(userId: string) {
    this.store.dispatch(new fromUsersDispatcher.TogglePlacelineId(userId));
  }
  setQuery(query) {
    this.store.dispatch(new fromUsersDispatcher.SetPlacelineQuery(query));
  }
  setSegmentSelectedId(segmentId) {
    this.store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId));
  }
  setSegmentResetMapId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId));
  }

  getMapData$() {
    // return dataWithSelectedId$(this.data$, this.segmentSelectedId$, [
    //   "segments"
    // ]);
  }

  clearData() {
    this.setData(null);
    this.setQuery({});
  }
}

export const UsersPlacelineClient = clientSubMixin(
  getIdQueryDataMixin(getFirstDataMixin(itemQueryMixin(UsersPlaceline)))
);

// applyMixins(UsersPlacelineClient, [ItemGetData, ItemQuery, ClientSub]);

// export const UsersPlacelineClientFactory = (): UsersPlaceline => {
//   let innerConfig: Partial<EntityTypeConfig> = {
//     name: 'users placeline',
//     updateStrategy: 'live',
//   };
//
//   let itemSelectors: EntityItemSelectors = {
//     query$: store.select(fromRoot.getQueryPlacelineQuery),
//     data$: store.select(fromRoot.getUsersUsersData),
//     loading$: store.select(fromRoot.getLoadingUserData),
//     id$: store.select(fromRoot.getQueryPlacelineId)
//   };
//
//   let placelineSelectors: AddUsersPlacelineSelector = {
//     segmentsState$: store.select(fromRoot.getSegmentsState),
//     getMapData$() {
//       return Observable.combineLatest(
//         this.data$,
//         this.segmentsState$,
//         (userData: IUserData, {selectedId, resetMapId}) => {
//           if(userData && (selectedId || resetMapId)) {
//             const id = selectedId || resetMapId;
//             let segments = _.filter(userData.segments, (segment: ISegment) => {
//               return segment.id === id;
//             });
//             userData = {...userData, segments: segments, events: [], actions: []}
//           }
//           return userData
//         }
//       )
//     }
//   };
//
//   let dispatchers: EntityItemDispatchers = {
//     setData(data) {
//       store.dispatch(new fromUsersDispatcher.SetUserData(data))
//     },
//     setLoading(data) {
//       store.dispatch(new fromLoadingDispatcher.SetLoadingUserData(data))
//     },
//     setId(id) {
//       store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
//     },
//     toggleId(userId: string) {
//       store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
//     },
//     addQuery(query) {
//       store.dispatch(new fromQueryDispatcher.SetPlacelineQuery(query))
//     }
//   };
//
//   let placelineDispatchers: AddUsersPlacelineDispatchers = {
//     setSegmentSelectedId(segmentId) {
//       store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
//     },
//     setSegmentResetMapId(segmentId: string) {
//       store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
//     },
//   };
//
//
//   let api = clientApi.users;
//   let api$ = (id, query) => api.placeline(id, query);
//
//   let state = {
//     api$,
//     selectors: {
//       ...itemSelectors,
//       ...placelineSelectors
//     },
//     dispatchers: {
//       ...dispatchers,
//       ...placelineDispatchers
//     }
//   };
//
//   const placeline = entityClientFactory(state, innerConfig, 'item') as UsersPlaceline;
//
//   placeline.init();
//
//   return placeline
// };
