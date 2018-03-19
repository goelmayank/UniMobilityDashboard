import {
  Action,
  ActionReducerFactory,
  ActionReducerMap,
  InitialState,
  MetaReducer
} from "./models";
import { combineReducers, createReducerFactory } from "./utils";
import { Dispatcher } from "./dispatcher";
import { ReducerManager } from "./reducer-manager";
import { ScannedActionsSubject } from "./scanned-action";
import { State } from "./state";
import { Store } from "./store";
import { Effects } from "./effects";

export type StoreConfig<T, V extends Action = Action> = {
  initialState?: InitialState<T>;
  reducerFactory?: ActionReducerFactory<T, V>;
  metaReducers?: MetaReducer<T, V>[];
};

export class StoreProvider {
  INITIAL_STATE;
  metaReducers;
  _REDUCER_FACTORY;
  REDUCER_FACTORY;
  dispatcher;
  reducerManager;
  SCANNED_ACTIONS_SUBJECT_PROVIDERS;
  STATE_PROVIDERS;
  STORE_PROVIDERS;
  EFFECTS_PROVIDERS;
  constructor(
    reducers: ActionReducerMap<any, any>,
    config: StoreConfig<any, any> = {}
  ) {
    this.INITIAL_STATE = config.initialState;
    this.metaReducers = config.metaReducers;
    this._REDUCER_FACTORY = config.reducerFactory
      ? config.reducerFactory
      : combineReducers;
    this.REDUCER_FACTORY = createReducerFactory(
      this._REDUCER_FACTORY,
      this.metaReducers
    );
    this.dispatcher = new Dispatcher(); //actionSubject
    this.EFFECTS_PROVIDERS = new Effects(this.dispatcher);
    this.reducerManager = new ReducerManager(
      this.dispatcher,
      this.INITIAL_STATE,
      reducers,
      this.REDUCER_FACTORY
    );
    this.SCANNED_ACTIONS_SUBJECT_PROVIDERS = new ScannedActionsSubject();
    this.STATE_PROVIDERS = new State(
      this.dispatcher,
      this.reducerManager,
      this.SCANNED_ACTIONS_SUBJECT_PROVIDERS,
      this.INITIAL_STATE
    );
    this.STORE_PROVIDERS = new Store(
      this.STATE_PROVIDERS,
      this.dispatcher,
      this.reducerManager
    );
  }
}

export const storeFactory = (
  reducers: ActionReducerMap<any, any>,
  config: StoreConfig<any, any> = {}
): StoreProvider => {
  let INITIAL_STATE = config.initialState;
  let metaReducers = config.metaReducers;
  let _REDUCER_FACTORY = config.reducerFactory
    ? config.reducerFactory
    : combineReducers;
  let REDUCER_FACTORY = createReducerFactory(_REDUCER_FACTORY, metaReducers);
  let dispatcher = new Dispatcher(); //actionSubject
  let EFFECTS_PROVIDERS = new Effects(dispatcher);
  let reducerManager = new ReducerManager(
    dispatcher,
    INITIAL_STATE,
    reducers,
    REDUCER_FACTORY
  );
  let SCANNED_ACTIONS_SUBJECT_PROVIDERS = new ScannedActionsSubject();
  let STATE_PROVIDERS = new State(
    dispatcher,
    reducerManager,
    SCANNED_ACTIONS_SUBJECT_PROVIDERS,
    INITIAL_STATE
  );
  let STORE_PROVIDERS = new Store(STATE_PROVIDERS, dispatcher, reducerManager);

  return {
    INITIAL_STATE,
    metaReducers,
    _REDUCER_FACTORY,
    dispatcher, //actionSubject
    SCANNED_ACTIONS_SUBJECT_PROVIDERS,
    REDUCER_FACTORY,
    EFFECTS_PROVIDERS,
    reducerManager,
    STATE_PROVIDERS,
    STORE_PROVIDERS
  };
};
