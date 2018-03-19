import * as SegmentsDispatch from "../dispatchers/segments-dispatcher";

const initialState: State = {};

export interface State {
  selectedId?: string | null;
  highlightedId?: string | null;
  resetMapId?: string | null;
  popupId?: string | null;
}

export function segmentsReducer(
  state: State = initialState,
  action: SegmentsDispatch.All
): State {
  switch (action.type) {
    case SegmentsDispatch.SET_SELECTED_ID: {
      return { ...state, selectedId: action.payload };
    }
    case SegmentsDispatch.SET_RESET_MAP_ID: {
      return { ...state, resetMapId: action.payload };
    }
    case SegmentsDispatch.SET_HIGHLIGHTED_ID: {
      return !!state.selectedId
        ? { ...state, highlightedId: action.payload }
        : state;
    }
    case SegmentsDispatch.SET_POPUP_ID: {
      return !!state.selectedId ? { ...state, popupId: action.payload } : state;
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getResetMapId = (state: State) => state.resetMapId;
