import { Action } from "../store/models";
import { IUserData, AllData } from "ht-models";
import { IUserAnalytics, IUser, Page, IUserListSummary } from "ht-models";
import { ApiType } from "../interfaces";

//placeline
export const SET_USER_DATA = "[USERS] set user data";
export const SET_PLACELINE_ID = "[USERS] set placeline id";
export const TOGGLE_PLACELINE_ID = "[USERS] toggle placeline id";
export const SET_PLACELINE_QUERY = "[USERS] set placeline query";
export const ADD_PLACELINE_QUERY = "[USERS] add placeline query";
export const SET_PLACELINE_LOADING = "[USERS] set placeline loading";
//list
export const SET_LIST_ACTIVE = "[USERS] set list active";
export const SET_LIST_ID = "[USERS] set list id";
export const SET_LIST_QUERY = "[USERS] set list query";
export const ADD_LIST_QUERY = "[USERS] add list query";
export const CLEAR_QUERY_KEY = "[USERS] clear query key";
export const TOGGLE_LIST_ID = "[USERS] toggle list id";
//analytics page
export const SET_USERS_ANALYTICS_PAGE = "[USERS] set user analytics page";
export const SET_USERS_ANALYTICS_ID = "[USERS] set analytics id";
export const SET_USERS_ANALYTICS_QUERY = "[USERS] set analytics query";
export const SET_USERS_ANALYTICS_LOADING = "[USERS] set analytics loading";
export const SET_USERS_LIST_DATA_MAP = "[USERS] set users list data map";

//analytics all
export const SET_MARKERS_ACTIVE = "[USERS] set markerS active";
export const SET_USERS_ANALYTICS_ALL = "[USERS] set users analytics all";
export const ADD_USERS_ANALYTICS_ALL = "[USERS] add users analytics all";
export const SET_USERS_ANALYTICS_ALL_QUERY = "[USERS] add analytics all query";
export const ADD_USERS_ANALYTICS_ALL_QUERY = "[USERS] set analytics all query";
export const SET_USERS_ANALYTICS_ALL_LOADING =
  "[USERS] set analytics all loading";
export const SET_USERS_MARKERS_DATA_MAP = "[USERS] set users listAll data map";

//summary
export const SET_SUMMARY_ACTIVE = "[USERS] set summary active";
export const SET_USERS_SUMMARY = "[USERS] set users summary";
export const SET_USERS_SUMMARY_LOADING = "[USERS] set summary loading";

export const SET_USERS_INDEX_PAGE = "[USERS] set user index page";
export const ADD_USERS_INDEX_ALL = "[USERS] add users index all";
export const SET_USERS_LIST_API_TYPE = "[USERS] set users list api type";

export class SetUserData implements Action {
  readonly type = SET_USER_DATA;
  constructor(public payload: IUserData | null) {}
}

export class SetPlacelineId implements Action {
  readonly type = SET_PLACELINE_ID;
  constructor(public payload: string | null) {}
}

export class TogglePlacelineId implements Action {
  readonly type = TOGGLE_PLACELINE_ID;
  constructor(public payload: string) {}
}

export class SetPlacelineQuery implements Action {
  readonly type = SET_PLACELINE_QUERY;
  constructor(public payload: object) {}
}

export class AddPlacelineQuery implements Action {
  readonly type = ADD_PLACELINE_QUERY;
  constructor(public payload: object) {}
}

export class SetPlacelineLoading implements Action {
  readonly type = SET_PLACELINE_LOADING;
  constructor(public payload: boolean | string) {}
}

export class SetUsersListId implements Action {
  readonly type = SET_LIST_ID;
  constructor(public payload: string | null) {}
}

export class ToggleUsersListId implements Action {
  readonly type = TOGGLE_LIST_ID;
  constructor(public payload: string) {}
}

export class SetListQuery implements Action {
  readonly type = SET_LIST_QUERY;
  constructor(public payload: object) {}
}

export class AddListQuery implements Action {
  readonly type = ADD_LIST_QUERY;
  constructor(public payload: object) {}
}

export class ClearQueryKey implements Action {
  readonly type = CLEAR_QUERY_KEY;
  constructor(public payload: string) {}
}

export class SetUsersAnalyticsPage implements Action {
  readonly type = SET_USERS_ANALYTICS_PAGE;
  constructor(public payload: Page<IUserAnalytics>) {}
}

export class SetUsersAnalyticsLoading implements Action {
  readonly type = SET_USERS_ANALYTICS_LOADING;
  constructor(public payload: boolean = true) {}
}

export class SetUsersIndexPage implements Action {
  readonly type = SET_USERS_INDEX_PAGE;
  constructor(public payload: Page<IUser>) {}
}

export class AddUsersAnalyticsAll implements Action {
  readonly type = ADD_USERS_ANALYTICS_ALL;
  constructor(public payload: Page<IUserAnalytics>) {}
}

export class SetUsersAnalyticsAll implements Action {
  readonly type = SET_USERS_ANALYTICS_ALL;
  constructor(public payload: Page<IUserAnalytics>) {}
}

export class SetUsersAnalyticsAllLoading implements Action {
  readonly type = SET_USERS_ANALYTICS_ALL_LOADING;
  constructor(public payload: boolean = true) {}
}

export class SetUsersIndexAll implements Action {
  //todo change name
  readonly type = ADD_USERS_INDEX_ALL;
  constructor(public payload: AllData<IUser>) {}
}

export class SetUsersListApiType implements Action {
  readonly type = SET_USERS_LIST_API_TYPE;
  constructor(public payload: ApiType) {}
}

export class SetUsersListDataMap implements Action {
  readonly type = SET_USERS_LIST_DATA_MAP;
  constructor(public payload: (user) => any) {}
}

export class SetUsersMarkersDataMap implements Action {
  readonly type = SET_USERS_MARKERS_DATA_MAP;
  constructor(public payload: (data) => any) {}
}

export class SetListActive implements Action {
  readonly type = SET_LIST_ACTIVE;
  constructor(public payload: boolean | string = true) {}
}

export class SetMarkersActive implements Action {
  readonly type = SET_MARKERS_ACTIVE;
  constructor(public payload: boolean | string = true) {}
}

export class SetSummaryActive implements Action {
  readonly type = SET_SUMMARY_ACTIVE;
  constructor(public payload: boolean | string = true) {}
}

export class SetUsersSummary implements Action {
  readonly type = SET_USERS_SUMMARY;
  constructor(public payload: IUserListSummary) {}
}

export class SetSummaryLoading implements Action {
  readonly type = SET_USERS_SUMMARY_LOADING;
  constructor(public payload: boolean = true) {}
}

export type All =
  | SetUserData
  | SetPlacelineId
  | TogglePlacelineId
  | SetPlacelineQuery
  | AddPlacelineQuery
  | SetPlacelineLoading
  | SetUsersListId
  | ToggleUsersListId
  | SetListQuery
  | AddListQuery
  | ClearQueryKey
  | SetUsersAnalyticsPage
  | SetUsersAnalyticsLoading
  | SetUsersIndexPage
  | AddUsersAnalyticsAll
  | SetUsersAnalyticsAll
  | SetUsersAnalyticsAllLoading
  | SetUsersIndexAll
  | SetUsersSummary
  | SetUsersListApiType
  | SetUsersListDataMap
  | SetUsersMarkersDataMap
  | SetListActive
  | SetMarkersActive
  | SetSummaryActive
  | SetSummaryLoading;
