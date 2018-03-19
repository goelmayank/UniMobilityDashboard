import * as QueryDispatch from "../dispatchers/query-dispatcher";
import { IDateRange } from "../interfaces";
const initialState: State = {};

export interface State {
  userQuery?: object | null;
  dateRange?: IDateRange;
  userId?: string | null;
}

export function queryReducer(
  state: State = initialState,
  action: QueryDispatch.All
): State {
  switch (action.type) {
    case QueryDispatch.SET_DATE_RANGE: {
      return { ...state, dateRange: action.payload };
    }
    case QueryDispatch.SET_USER_QUERY: {
      return { ...state, userQuery: { ...state.userQuery, ...action.payload } };
    }
    case QueryDispatch.SET_USER_QUERY_RESET_PAGE: {
      return { ...state, userQuery: { ...action.payload, page: null } };
    }
    case QueryDispatch.CLEAR_USER_QUERY_KEY: {
      let query = { ...state.userQuery };
      delete query[action.payload];
      return { ...state, userQuery: query };
    }
    case QueryDispatch.SET_USER_ID: {
      return { ...state, userId: action.payload };
    }
    case QueryDispatch.TOGGLE_USER_ID: {
      const userId = state.userId == action.payload ? null : action.payload;
      return { ...state, userId };
    }
    default: {
      return state;
    }
  }
}

export const getUsersQuery = (state: State) => state.userQuery;
export const getUsersId = (state: State) => state.userId;
