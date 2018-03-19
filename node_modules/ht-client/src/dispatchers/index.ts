import * as GroupsDispatcher from "../dispatchers/groups-dispatcher";
import * as UsersDispatcher from "../dispatchers/user-dispatcher";
import * as LoadingDispatcher from "../dispatchers/loading-dispatcher";
import * as QueryDispatcher from "../dispatchers/query-dispatcher";
import * as SegmentsDispatcher from "../dispatchers/segments-dispatcher";

export const Dispatcher = {
  groups: GroupsDispatcher,
  users: UsersDispatcher,
  loading: LoadingDispatcher,
  query: QueryDispatcher,
  Segment: SegmentsDispatcher
};
