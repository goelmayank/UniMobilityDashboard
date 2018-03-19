import * as UserDispatch from "../dispatchers/user-dispatcher";
import {
  IUserData,
  AllData,
  Page,
  IUser,
  IUserAnalytics,
  IUserListSummary
} from "ht-models";
import { ApiType } from "../interfaces";
import { createSelector, MemoizedSelector } from "../store/selector";
import * as _ from "underscore";
import { htUser } from "ht-data";

const initialUsersAnalyticsAll = {
  resultsEntity: {},
  isFirst: false
};

const initialUsersIndexAll = {
  resultsEntity: {},
  isFirst: false
};

const initialState: State = {
  usersListActive: false,
  usersMarkersActive: false,
  usersSummaryActive: false,
  listApiType: ApiType.analytics,
  usersAnalyticsAll: initialUsersAnalyticsAll,
  usersIndexAll: initialUsersIndexAll
};

export interface State {
  userData?: IUserData | undefined | null; //placeline data,
  placelineId?: string | null;
  placelineQuery?: object;
  placelineLoading?: boolean;

  usersListActive: boolean | string;
  listQuery?: object;
  listId?: string | null;
  usersListDataMap?: (data) => any;

  usersAnalyticsPage?: Page<IUserAnalytics> | null;
  analyticsLoading?: boolean;

  usersMarkersActive: boolean | string;
  usersAnalyticsAll?: AllData<IUserAnalytics>;
  analyticsAllLoading?: boolean;
  usersMarkersDataMap?: (data) => any;
  //summary
  usersSummaryActive: boolean | string;
  usersSummary?: IUserListSummary | null;
  summaryLoading?: boolean;

  usersIndexAll?: AllData<IUser>;
  usersIndexPage?: Page<IUser>;
  listApiType: ApiType;
}

export function usersReducer(
  state: State = initialState,
  action: UserDispatch.All
): State {
  switch (action.type) {
    /*
    placeline
     */
    case UserDispatch.SET_USER_DATA: {
      return { ...state, userData: action.payload };
    }
    case UserDispatch.SET_PLACELINE_ID: {
      return { ...state, placelineId: action.payload };
    }
    case UserDispatch.TOGGLE_PLACELINE_ID: {
      const placelineId =
        state.placelineId == action.payload ? null : action.payload;
      return { ...state, placelineId };
    }
    case UserDispatch.SET_PLACELINE_QUERY: {
      return { ...state, placelineQuery: action.payload };
    }
    case UserDispatch.ADD_PLACELINE_QUERY: {
      return {
        ...state,
        placelineQuery: { ...state.placelineQuery, ...action.payload }
      };
    }
    case UserDispatch.SET_PLACELINE_LOADING: {
      return { ...state, placelineLoading: !!action.payload };
    }
    /*
    List
     */
    case UserDispatch.SET_LIST_ID: {
      return { ...state, listId: action.payload };
    }
    case UserDispatch.TOGGLE_LIST_ID: {
      const listId = state.listId == action.payload ? null : action.payload;
      return { ...state, listId: listId };
    }
    case UserDispatch.SET_LIST_ACTIVE: {
      return { ...state, usersListActive: action.payload };
    }
    case UserDispatch.ADD_LIST_QUERY: {
      return { ...state, listQuery: { ...state.listQuery, ...action.payload } };
    }
    case UserDispatch.SET_LIST_QUERY: {
      return { ...state, listQuery: action.payload };
    }
    case UserDispatch.CLEAR_QUERY_KEY: {
      let listQuery = { ...state.listQuery };
      if (listQuery) delete listQuery[action.payload];
      return { ...state, listQuery: listQuery };
    }
    /*
    Analytics page
     */

    case UserDispatch.SET_USERS_ANALYTICS_PAGE: {
      return { ...state, usersAnalyticsPage: action.payload };
    }
    case UserDispatch.SET_USERS_ANALYTICS_LOADING: {
      return { ...state, analyticsLoading: action.payload };
    }
    case UserDispatch.SET_USERS_INDEX_PAGE: {
      return { ...state, usersIndexPage: action.payload };
    }
    case UserDispatch.ADD_USERS_ANALYTICS_ALL: {
      let resultsEntity = {};
      if (state.usersAnalyticsAll) {
        resultsEntity = {
          ...state.usersAnalyticsAll.resultsEntity,
          ..._.indexBy(action.payload.results, "id")
        };
      }

      return {
        ...state,
        usersAnalyticsAll: {
          next: action.payload.next,
          previous: action.payload.previous,
          count: action.payload.count,
          resultsEntity
        }
      };
    }
    case UserDispatch.SET_USERS_ANALYTICS_ALL: {
      let resultsEntity = {};
      if (state.usersAnalyticsAll) {
        resultsEntity = _.indexBy(action.payload.results, "id");
      }
      return {
        ...state,
        usersAnalyticsAll: {
          next: action.payload.next,
          previous: action.payload.previous,
          count: action.payload.count,
          resultsEntity
        }
      };
    }
    case UserDispatch.SET_USERS_ANALYTICS_ALL_LOADING: {
      return { ...state, analyticsAllLoading: action.payload };
    }
    case UserDispatch.ADD_USERS_INDEX_ALL: {
      // const newEntities = _.indexBy(action.payload.results, 'id');
      const resultsEntity = state.usersIndexAll
        ? {
            ...state.usersIndexAll.resultsEntity,
            ...action.payload.resultsEntity
          }
        : {};
      return { ...state, usersIndexAll: { ...action.payload, resultsEntity } };
    }
    case UserDispatch.SET_USERS_LIST_DATA_MAP: {
      return { ...state, usersListDataMap: action.payload };
    }
    case UserDispatch.SET_USERS_MARKERS_DATA_MAP: {
      return { ...state, usersMarkersDataMap: action.payload };
    }
    case UserDispatch.SET_USERS_LIST_API_TYPE: {
      return { ...state, listApiType: action.payload };
    }
    case UserDispatch.SET_MARKERS_ACTIVE: {
      return { ...state, usersMarkersActive: action.payload };
    }
    /*
    Summary
     */
    case UserDispatch.SET_SUMMARY_ACTIVE: {
      return { ...state, usersSummaryActive: action.payload };
    }
    case UserDispatch.SET_USERS_SUMMARY: {
      return { ...state, usersSummary: action.payload };
    }
    case UserDispatch.SET_USERS_SUMMARY_LOADING: {
      return { ...state, summaryLoading: !!action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getUserData = (state: State) => state.userData;
export const getPlacelineId = (state: State) => state.placelineId;
export const getPlacelineQuery = (state: State) => state.placelineQuery;
export const getPlacelineLoading = (state: State) => state.placelineLoading;

export const getListActive = (state: State) => state.usersListActive;
export const getListId = (state: State) => state.listId;
export const getListQuery = (state: State) => state.listQuery;

export const getAnalyticsPage = (state: State) => state.usersAnalyticsPage;
export const getAnalyticsLoading = (state: State) => state.analyticsLoading;

export const getAnalyticsAll = (state: State) => state.usersAnalyticsAll;
export const getAnalyticsAllLoading = (state: State) =>
  state.analyticsAllLoading;
export const getMarkerDataMap = (state: State) => state.usersMarkersDataMap;

export const getIndexAll = (state: State) => state.usersIndexAll;
// export const getAnalyticFilteredsMarkers = (state: State) => validMarkers(state.usersAnalyticsAll);
// export const getIndexFilteredMarkers = (state: State) => validMarkers(state.usersIndexAll);
export const getIndexPage = (state: State) => state.usersIndexPage;
export const getListApiType = (state: State) => state.listApiType;
export const getMarkersActive = (state: State) => state.usersMarkersActive;

export const getSummary = (state: State) => state.usersSummary;
export const getSummaryActive = (state: State) => state.usersSummaryActive;
export const getSummaryLoading = (state: State) => state.summaryLoading;

export const getAnalyticFilteredMarkers = createSelector(
  getAnalyticsAll,
  getMarkerDataMap,
  (allData: AllData<any>, mapFunc) => {
    return mapFunc ? mapFunc(allData) : allData;
  }
);

export const getIndexFilteredMarkers = createSelector(
  getIndexAll,
  getMarkerDataMap,
  (allData: AllData<any>, mapFunc) => {
    return mapFunc ? mapFunc(allData) : allData;
  }
);

export const getIndexActive = createSelector(
  getListApiType,
  getListActive,
  (apiType, isListActive) => {
    return false;
    // return apiType === ApiType.index && isListActive
  }
);
export const getAnalyticsActive = createSelector(
  getListApiType,
  getListActive,
  (apiType, isListActive) => {
    return isListActive;
    // return apiType === ApiType.analytics && isListActive
  }
);

export const getIndexMarkersActive = createSelector(
  getListApiType,
  getMarkersActive,
  (apiType, isMarkersActive) => {
    return false;
    // return apiType === ApiType.index && isMarkersActive
  }
);
export const getAnalyticsMarkersActive = createSelector(
  getListApiType,
  getMarkersActive,
  (apiType, isMarkersActive) => {
    return isMarkersActive;
    // return apiType === ApiType.analytics && isMarkersActive
  }
);
