import { Action } from "./models";
import { Subject } from "rxjs/Subject";

export class ScannedActionsSubject extends Subject<Action> {}
