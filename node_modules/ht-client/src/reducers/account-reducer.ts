import * as AccountDispatcher from "../dispatchers/accounts-dispatcher";
import { Page, IAccountUser, IMembership } from "ht-models";
import { createSelector, MemoizedSelector } from "../store/selector";

export interface State {
  accountUser?: IAccountUser;
  membershipsAll?: Page<IMembership> | null;
  userId?: string | null;
  key: string;
  tempKey?: string | null;
}

export const initialState: State = {
  key: "false"
};

export function reducer(
  state: State = initialState,
  action: AccountDispatcher.All
): State {
  switch (action.type) {
    case AccountDispatcher.SET_ACCOUNT_USER: {
      return { ...state, accountUser: action.payload };
    }
    case AccountDispatcher.SET_MEMBERHSHIPS_ALL: {
      // let results = state.membershipsAll ? [...state.membershipsAll.results, ...action.payload.results] : action.payload.results;
      // return {...state, membershipsAll: {...action.payload, results}}
      return { ...state, membershipsAll: action.payload };
    }
    case AccountDispatcher.SET_KEY: {
      return { ...state, key: action.payload };
    }
    case AccountDispatcher.SET_TEMP_KEY: {
      return { ...state, tempKey: action.payload };
    }
    case AccountDispatcher.SET_USER_ID: {
      return { ...state, userId: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getAccountUser = (state: State) => state.accountUser;
export const getMembershipsAll = (state: State) => state.membershipsAll;
export const getKey = (state: State) => state.key;
export const getTempKey = (state: State) => state.tempKey;
export const getUserId = (state: State) => state.userId;
export const getCurrentKey = createSelector(
  getKey,
  getTempKey,
  (key, tempKey) => {
    return tempKey || key;
  }
);
