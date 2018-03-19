import * as ActionsDispatcher from "../dispatchers/actions-dispatcher";
import { IAction, IActionHeatPage, IActionStatusGraph, Page, IActionsSummary } from "ht-models";

export interface State {
  list: Page<IAction> | null,
  listLoading: boolean | string,
  listQuery: object,
  listActive: string | boolean,

  summary: IActionsSummary | null,
  summaryActive: boolean | string,
  summaryLoading: boolean
  summaryQuery: object,

  graph: IActionStatusGraph | null,
  graphLoading: boolean,
  graphQuery: object
};

export const initialState: State = {
  list: null,
  listLoading: false,
  listQuery: {},
  listActive: false,

  summary: null,
  summaryActive: false,
  summaryLoading: false,
  summaryQuery: {},

  graph: null,
  graphLoading: false,
  graphQuery: {}
};

export function actionsReducer(
  state: State = initialState,
  action: ActionsDispatcher.All
): State {
  switch (action.type) {
    /*
    list
     */
    case ActionsDispatcher.SET_ACTIONS_LIST: {
      return { ...state, list: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_ACTIVE: {
      return { ...state, listActive: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_QUERY: {
      return { ...state, listQuery: action.payload };
    }
    case ActionsDispatcher.ADD_ACTIONS_LIST_QUERY: {
      const listQuery = {...state.listQuery, ...action.payload};
      return { ...state, listQuery };
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_LOADING: {
      return { ...state, listLoading: action.payload };
    }
    /*
    Summary
     */
    case ActionsDispatcher.SET_ACTIONS_SUMMARY: {
      return { ...state, summary: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_SUMMARY_LOADING: {
      return { ...state, summaryLoading: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_SUMMARY_ACTIVE: {
      return { ...state, summaryActive: action.payload };

    }
    case ActionsDispatcher.SET_ACTIONS_SUMMARY_QUERY: {
      return { ...state, summaryQuery: action.payload };

    }
    case ActionsDispatcher.ADD_ACTIONS_SUMMARY_QUERY: {
      const summaryQuery = {...state.summaryQuery, ...action.payload};
      return { ...state, summaryQuery };
    }
    /*
    Graph
     */
    case ActionsDispatcher.SET_ACTIONS_GRAPH: {
      return {...state, graph: action.payload}
    }
    case ActionsDispatcher.SET_ACTIONS_GRAPH_LOADING: {
      return {...state, graphLoading: action.payload}
    }
    case ActionsDispatcher.SET_ACTIONS_GRAPH_QUERY: {
      return {...state, graphQuery: action.payload}
    }
    case ActionsDispatcher.ADD_ACTIONS_GRAPH_QUERY: {
      const graphQuery = {...state.graphQuery, ...action.payload};
      return {...state, graphQuery}
    }
    default: {
      return state;
    }
  }
};

export const getList = (state: State) => state.list;
export const getListLoading = (state: State) => state.listLoading;
export const getListActive = (state: State) => state.listActive;
export const getListQuery = (state: State) => state.listQuery;

export const getSummary = (state: State) => state.summary;
export const getSummaryActive = (state: State) => state.summaryActive;
export const getSummaryQuery = (state: State) => state.summaryQuery;
export const getSummaryLoading = (state: State) => state.summaryLoading;

export const getGraph = (state: State) => state.graph;
export const getGraphQuery = (state: State) => state.graphQuery;
export const getGraphLoading = (state: State) => state.graphLoading;