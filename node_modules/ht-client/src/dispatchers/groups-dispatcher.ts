import { Action } from "../store/models";
// import {AllData} from "../interfaces";
import { IGroup, AllData } from "ht-models";

export const SET_LIST_ACTIVE = "[GROUPS] set list active";
export const SET_ID = "[GROUPS] set id";
export const SET_GROUPS = "[GROUPS] set groups";
export const SET_GROUP = "[GROUPS] set group";

export class SetListActive implements Action {
  readonly type = SET_LIST_ACTIVE;
  constructor(public payload: boolean = true) {}
}

export class SetGroupId implements Action {
  readonly type = SET_ID;
  constructor(public payload: string | null) {}
}

export class SetGroupsAll implements Action {
  readonly type = SET_GROUPS;
  constructor(public payload: AllData<IGroup>) {}
}

export class SetGroup implements Action {
  readonly type = SET_GROUP;
  constructor(public payload: IGroup) {}
}

export type All = SetGroupId | SetGroupsAll | SetGroup | SetListActive;
