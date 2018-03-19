import { ActionReducerMap } from "../store/models";
import { combineReducers } from "../store/utils";
import { Action, ActionReducer } from "../store/models";
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "../store/selector";
import * as fromUsers from "./user-reducer";
import * as fromSegments from "./segments-reducer";
import * as fromQuery from "./query-reducer";
import * as fromLoading from "./loading-reducer";
import * as fromGroups from "./groups-reducer";
import * as fromAccounts from "./account-reducer";
import * as fromActions from "./actions-reducer";
import {
  IUserData,
  IUser,
  IUserAnalytics,
  IGroup,
  IUserListSummary,
  IAccountUser,
  IMembership,
  AllData,
  IActionStatusGraph,
  IActionsSummary,
  IAction
} from "ht-models";
import { ApiType } from "../interfaces";
import { Observable } from "rxjs/Observable";

export interface State {
  // users: fromUsers.State,
  // segments: fromSegments.State,
  // query: fromQuery.State,
  // loading: fromLoading.State
  // groups: fromGroups.State
}

export const reducers: ActionReducerMap<State> = {
  // users: fromUsers.usersReducer,
  // segments: fromSegments.segmentsReducer,
  // query: fromQuery.queryReducer,
  // loading: fromLoading.loadingReducer,
  // groups: fromGroups.groupsReducer
};

export function reducer(state: any, action: any) {
  return combineReducers(reducers);
}

export const metaReducers: ActionReducer<any, any>[] = [];

/**
 * Users selectors
 */
export const getUsersState = createFeatureSelector<fromUsers.State>("users");

export const getUsersUsersData = createSelector(
  getUsersState,
  fromUsers.getUserData
);
export const getUsersPlacelineId = createSelector(
  getUsersState,
  fromUsers.getPlacelineId
);
export const getUsersPlacelineQuery = createSelector(
  getUsersState,
  fromUsers.getPlacelineQuery
);
export const getUsersPlacelineLoading = createSelector(
  getUsersState,
  fromUsers.getPlacelineLoading
);

export const getUsersListActive = createSelector(
  getUsersState,
  fromUsers.getListActive
);
export const getUsersListId = createSelector(
  getUsersState,
  fromUsers.getListId
);
export const getUsersListQuery = createSelector(
  getUsersState,
  fromUsers.getListQuery
);

export const getUsersAnalyticsPage = createSelector(
  getUsersState,
  fromUsers.getAnalyticsPage
);
export const getUsersAnalyticsLoading = createSelector(
  getUsersState,
  fromUsers.getAnalyticsLoading
);

export const getUsersIndexPage = createSelector(
  getUsersState,
  fromUsers.getIndexPage
);
// export const getUsersListApiType = createSelector(getUsersState, fromUsers.getListApiType);
export const getUsersIndexIsActive = createSelector(
  getUsersState,
  fromUsers.getIndexActive
);
export const getUsersAnalyticsIsActive = createSelector(
  getUsersState,
  fromUsers.getAnalyticsActive
);
export const getUsersIndexMarkersIsActive = createSelector(
  getUsersState,
  fromUsers.getIndexMarkersActive
);
export const getUsersAnalyticsMarkersIsActive = createSelector(
  getUsersState,
  fromUsers.getAnalyticsMarkersActive
);
export const getUsersAnalyticsAllLoading = createSelector(
  getUsersState,
  fromUsers.getAnalyticsAllLoading
);
export const getUsersIndexFilteredMarker = createSelector(
  getUsersState,
  fromUsers.getIndexFilteredMarkers
);
export const getUsersAnalyticsFilteredMarker = createSelector(
  getUsersState,
  fromUsers.getAnalyticFilteredMarkers
);
export const getUsersIndexAll = createSelector(
  getUsersState,
  fromUsers.getIndexAll
);
export const getUsersAnalyticsAll = createSelector(
  getUsersState,
  fromUsers.getAnalyticsAll
);
export const getUsersSummary = createSelector(
  getUsersState,
  fromUsers.getSummary
);
export const getUsersSummaryActive = createSelector(
  getUsersState,
  fromUsers.getSummaryActive
);
export const getUsersSummaryLoading = createSelector(
  getUsersState,
  fromUsers.getSummaryLoading
);

/**
 * Segment selectors
 */
export const getSegmentsState = createFeatureSelector<fromSegments.State>(
  "segments"
);
export const getSegmentsSelectedId = createSelector(
  getSegmentsState,
  fromSegments.getSelectedId
);
export const getSegmentsResetMapId = createSelector(
  getSegmentsState,
  fromSegments.getResetMapId
);

/**
 *
 * Groups reducer
 */
export const getGroupsState = createFeatureSelector<fromGroups.State>("groups");
export const getGroupId = createSelector(getGroupsState, fromGroups.getId);
export const getGroupAll = createSelector(
  getGroupsState,
  fromGroups.getAllGroups
);
export const getGroupListActive = createSelector(
  getGroupsState,
  fromGroups.getListActive
);

/**
 Account
 */
export const getAccountState = createFeatureSelector<fromAccounts.State>(
  "accounts"
);
export const getAccountUser = createSelector(
  getAccountState,
  fromAccounts.getAccountUser
);
export const getAccountMembershipsAll = createSelector(
  getAccountState,
  fromAccounts.getMembershipsAll
);
export const getAccountKey = createSelector(
  getAccountState,
  fromAccounts.getKey
);
export const getAccountTempKey = createSelector(
  getAccountState,
  fromAccounts.getTempKey
);
export const getAccountCurrentKey = createSelector(
  getAccountState,
  fromAccounts.getCurrentKey
);
export const getAccountUserId = createSelector(
  getAccountState,
  fromAccounts.getUserId
);

/**
 * Actions
 */
export const getActionsState = createFeatureSelector<fromActions.State>("actions");
export const getActionsList = createSelector(
  getActionsState,
  fromActions.getList
);

export const getActionsListLoading = createSelector(
  getActionsState,
  fromActions.getListLoading
);

export const getActionsListActive = createSelector(
  getActionsState,
  fromActions.getListActive
);

export const getActionsListQuery = createSelector(
  getActionsState,
  fromActions.getListQuery
);

export const getActionsSummary = createSelector(
  getActionsState,
  fromActions.getSummary
);

export const getActionsSummaryActive = createSelector(
  getActionsState,
  fromActions.getSummaryActive
);

export const getActionsSummaryLoading = createSelector(
  getActionsState,
  fromActions.getSummaryLoading
);

export const getActionsSummaryQuery = createSelector(
  getActionsState,
  fromActions.getSummaryQuery
);

export const getActionsGraph = createSelector(
  getActionsState,
  fromActions.getGraph
);

export const getActionsGraphLoading = createSelector(
  getActionsState,
  fromActions.getGraphLoading
);

export const getActionsGraphQuery = createSelector(
  getActionsState,
  fromActions.getGraphQuery
);

