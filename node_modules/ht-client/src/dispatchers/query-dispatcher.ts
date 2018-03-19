import { Action } from "../store/models";
import { IDateRange } from "../interfaces";

export const SET_DATE_RANGE = "[QUERY] set date range";
export const SET_USER_QUERY = "[QUERY] set user query";
export const SET_USER_QUERY_RESET_PAGE = "[QUERY] set user query reset page";
export const CLEAR_USER_QUERY_KEY = "[QUERY] clear user query key";
export const SET_USER_ID = "[USERS] set user id";
export const TOGGLE_USER_ID = "[USERS] toggle user id";
export const SET_PLACELINE_QUERY = "[USERS] Set placeline query";

export class SetDateRange implements Action {
  readonly type = SET_DATE_RANGE;
  constructor(public payload: IDateRange) {}
}

export class SetUserQuery implements Action {
  readonly type = SET_USER_QUERY;
  constructor(public payload: object | null) {}
}

export class SetUserQueryResetPage implements Action {
  readonly type = SET_USER_QUERY_RESET_PAGE;
  constructor(public payload: object | null) {}
}

export class ClearUserQueryKey implements Action {
  readonly type = CLEAR_USER_QUERY_KEY;
  constructor(public payload: string) {}
}

export class SetUserId implements Action {
  readonly type = SET_USER_ID;
  constructor(public payload: string | null) {}
}

export class ToggleUserId implements Action {
  readonly type = TOGGLE_USER_ID;
  constructor(public payload: string) {}
}

export class SetPlacelineQuery implements Action {
  readonly type = SET_PLACELINE_QUERY;
  constructor(public payload: object = {}) {}
}

export type All =
  | SetDateRange
  | SetUserQuery
  | SetUserQueryResetPage
  | ClearUserQueryKey
  | SetUserId
  | ToggleUserId
  | SetPlacelineQuery;
