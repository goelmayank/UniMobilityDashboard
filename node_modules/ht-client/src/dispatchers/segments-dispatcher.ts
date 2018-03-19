import { Action } from "../store/models";

export const SET_SELECTED_ID = "[SEGMENTS] set selected id";
export const SET_HIGHLIGHTED_ID = "[SEGMENTS] set highlighted id";
export const SET_RESET_MAP_ID = "[SEGMENTS] set reset map id";
export const SET_POPUP_ID = "[SEGMENTS] set popup id";

export class SetSelectedId implements Action {
  readonly type = SET_SELECTED_ID;
  constructor(public payload: string | null) {}
}

export class SetHighlightedId implements Action {
  readonly type = SET_HIGHLIGHTED_ID;
  constructor(public payload: string | null) {}
}

export class SetResetMapId implements Action {
  readonly type = SET_RESET_MAP_ID;
  constructor(public payload: string | null) {}
}

export class SetPopupId implements Action {
  readonly type = SET_POPUP_ID;
  constructor(public payload: string | null) {}
}

export type All = SetSelectedId | SetHighlightedId | SetResetMapId | SetPopupId;
