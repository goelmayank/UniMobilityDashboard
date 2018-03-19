import * as LoadingDispatcher from "../dispatchers/loading-dispatcher";

const initialState: State = {
  usersAnalytics: false,
  usersIndex: false,
  usersAnalyticsAll: false,
  usersIndexAll: false
};

export interface State {
  usersAnalytics: boolean;
  usersIndex: boolean;
  usersAnalyticsAll: boolean;
  usersIndexAll: boolean;
}

export function loadingReducer(
  state: State = initialState,
  action: LoadingDispatcher.All
): State {
  switch (action.type) {
    case LoadingDispatcher.SET_USER_ANALYTICS: {
      return { ...state, usersAnalytics: action.payload };
    }
    case LoadingDispatcher.SET_USER_INDEX: {
      return { ...state, usersIndex: action.payload };
    }
    case LoadingDispatcher.SET_USER_ANALYTICS_ALL: {
      return { ...state, usersAnalyticsAll: action.payload };
    }
    case LoadingDispatcher.SET_USER_INDEX_ALL: {
      return { ...state, usersIndexAll: action.payload };
    }
    default:
      return state;
  }
}

export const getUserAnalytics = (state: State) => state.usersAnalytics;
export const getUserIndex = (state: State) => state.usersIndex;
export const getUserAnalyticsAll = (state: State) => state.usersAnalyticsAll;
export const getUserIndexAll = (state: State) => state.usersIndexAll;
