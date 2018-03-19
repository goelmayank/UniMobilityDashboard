import { Action } from "../store/models";
import { IAccountUser } from "ht-models";
import { Page, IMembership } from "ht-models";

export const SET_ACCOUNT_USER = "[ACCOUNT] set account user";
export const SET_MEMBERHSHIPS_ALL = "[ACCOUNT] set memberships all";
export const SET_KEY = "[ACCOUNT] set key";
export const SET_TEMP_KEY = "[ACCOUNT] set temp key";
export const SET_USER_ID = "[ACCOUNT] set user id";

export class SetAccountUser implements Action {
  readonly type = SET_ACCOUNT_USER;
  constructor(public payload: IAccountUser) {}
}

export class SetMembershipsAll implements Action {
  readonly type = SET_MEMBERHSHIPS_ALL;
  constructor(public payload: Page<IMembership>) {}
}

export class SetKey implements Action {
  readonly type = SET_KEY;
  constructor(public payload: string) {}
}

export class SetTempKey implements Action {
  readonly type = SET_TEMP_KEY;
  constructor(public payload: string | null) {}
}

export class SetUserId implements Action {
  readonly type = SET_USER_ID;
  constructor(public payload: string | null) {}
}

export type All =
  | SetAccountUser
  | SetMembershipsAll
  | SetKey
  | SetTempKey
  | SetUserId;
