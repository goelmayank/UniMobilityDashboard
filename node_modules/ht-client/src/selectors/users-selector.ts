import * as fromRoot from "../reducers";
import * as fromUsers from "../reducers/user-reducer";
import * as fromQuery from "../reducers/query-reducer";
import { Store } from "../store/store";
import { Observable } from "rxjs/Observable";

export class UsersSelector {
  constructor(private store: Store<fromRoot.State>) {}

  get state(): Observable<fromUsers.State> {
    return this.store.select(fromRoot.getUsersState);
  }
}
