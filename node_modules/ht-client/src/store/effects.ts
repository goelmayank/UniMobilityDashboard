import { Observable } from "rxjs/Observable";
import { Dispatcher } from "./dispatcher";
import * as fromQueryDispatch from "../dispatchers/query-dispatcher";
import * as fromUsersDispatch from "../dispatchers/user-dispatcher";
import { flatMap, filter } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class Effects {
  constructor(dispatcher: Dispatcher) {
    // dispatcher.pipe(
    //   flatMap((action) => GetEffect(action)),
    //   filter(data => !!data)
    // ).subscribe((action) => {
    //   dispatcher.next(action)
    // })
  }
}
