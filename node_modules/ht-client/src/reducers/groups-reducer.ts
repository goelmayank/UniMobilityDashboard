import * as GroupDispatcher from "../dispatchers/groups-dispatcher";
import { IGroup, AllData } from "ht-models";

export interface State {
  selectedId?: string | null;
  allGroups?: AllData<IGroup> | null;
  group?: IGroup | null;
  listActive: boolean;
}

export const initialState: State = {
  listActive: false
};

export function groupsReducer(
  state: State = initialState,
  action: GroupDispatcher.All
): State {
  switch (action.type) {
    case GroupDispatcher.SET_LIST_ACTIVE: {
      return { ...state, listActive: action.payload };
    }
    case GroupDispatcher.SET_ID: {
      return { ...state, selectedId: action.payload };
    }
    case GroupDispatcher.SET_GROUPS: {
      return { ...state, allGroups: action.payload };
    }
    case GroupDispatcher.SET_GROUP: {
      return { ...state, group: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getId = (state: State) => state.selectedId;
export const getAllGroups = (state: State) => state.allGroups;
export const getListActive = (state: State) => state.listActive;
