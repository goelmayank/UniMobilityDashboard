import { Action } from "./models";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

export class Dispatcher extends BehaviorSubject<Action> {
  constructor() {
    super({ type: "INIT" });
  }

  next(action: Action): void {
    if (typeof action === "undefined") {
      throw new TypeError(`Actions must be objects`);
    } else if (typeof action.type === "undefined") {
      throw new TypeError(`Actions must have a type property`);
    }

    super.next(action);
  }
}
