import {CompoundDataObservableMixin, CompoundSetDataConfig} from "../mixins/compounds-data-observable";
import {MapInstance} from "../map-utils/map-instance";
import {IAction} from "ht-models";
import {DestinationMarker} from "../entities/destination-marker";
import { Observable } from "rxjs/Observable"
import { Subscription} from "rxjs/Subscription"
import {ActionsDataPolyline, ActionsPolylineTrace} from "../entities/actions-data-polyline";
import { StartMarkerTrace } from "../entities/start-marker";
import {TimeAwareAnimation} from "time-aware-polyline";
import {map} from "rxjs/operators";
import {ActionUser, ActionUserTrace} from "../entities/action-user";
import {AnimationsEntities} from "../mixins/animations-entities";

export class ActionMap {
  mapInstance: MapInstance;
  destination;
  polyline: ActionsDataPolyline;
  start;
  user: ActionUser;
  pulse: ActionUser;
  anim = new AnimationsEntities();
  constructor(mapInstance, options: IActionTraceOptions = {}) {
    this.mapInstance = mapInstance;
    this.destination = new DestinationMarker(mapInstance);
    this.polyline = new ActionsPolylineTrace(mapInstance);
    this.polyline.setTimeAwareAnimationEntity(this.anim);
    this.user = new ActionUserTrace(mapInstance);
    this.user.setTimeAwareAnimationEntity(this.anim);
    if (options.hasPulse) {
      this.pulse = new ActionUserTrace(mapInstance);
      this.pulse.setTimeAwareAnimationEntity(this.anim);
    }
    // this.user.setTimeAwareAnimation(this.anim);
    // this.user.toNotTraceItem = true;
    this.start = new StartMarkerTrace(mapInstance);
  }

  setData$(data$) {
    this.destination.setData$(data$);
    this.polyline.setData$(data$);
    this.start.setData$(data$);
    if (this.pulse) this.pulse.setData$(data$.pipe(map((actions: IAction[]) => {
      return actions.reduce((acc, action) =>{
        return action.display.show_summary ? acc : [...acc, action];
      }, [])
    })));
    this.user.setData$(data$.pipe(map((actions: IAction[]) => {
      return actions.reduce((acc, action) =>{
        return action.display.show_summary ? acc : [...acc, action];
      }, [])
    })));

  };


}

export interface IActionTraceOptions {
  hasPulse?: boolean
}

export const ActionTrace = ActionMap;