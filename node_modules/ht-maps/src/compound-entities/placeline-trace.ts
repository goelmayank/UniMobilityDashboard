import * as _ from "underscore";
import { IAction, ISegment, ITimelineEvent, IUserData, IPlacelineMod } from "ht-models";
import { SegmentPolylinesTrace } from "../entities/segment-polylines";
import {StopMarkersTrace} from "../entities/stop-markers";
import { ActionMarkersTrace } from "../entities/action-markers";
import { htAction } from "ht-data";
import { CurrentUserTrace } from "../entities/current-user";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {
  CompoundDataObservableMixin,
  CompoundSetDataConfig
} from "../mixins/compounds-data-observable";
import { HtPosition } from "ht-models";
import {MapInstance} from "../map-utils/map-instance";
import {HtMap} from "ht-map-wrapper";
import {TimeAwareAnimation} from "time-aware-polyline";
import {SingleItemMixin} from "../mixins/single-item";
import {ClusterMixin} from "../mixins/clusters";
import {debounceTime} from "rxjs/operators";
import {AnimationMixin} from "../mixins/animation-renderer";
import {AnimPolylineTrace} from "../entities/animation-polyline";
import { ActionsPolylineTrace } from "../entities/actions-polyline";
export class Placeline {
  segmentsPolylines;
  stopMarkers;
  actionMarkers;
  userMarker;
  animPolyline;
  allowedEvents = {};
  mapInstance: MapInstance;
  actionsPolyline;
  anim = new TimeAwareAnimation();
  constructor(public options: HtSegmentsTraceOptions) {
    this.mapInstance = this.options.mapInstance;
    this.stopMarkers = new StopMarkersTrace(this.mapInstance);
    this.userMarker = new CurrentUserTrace(this.mapInstance);
    this.userMarker.setTimeAwareAnimation(this.anim);
    this.segmentsPolylines = new SegmentPolylinesTrace(this.mapInstance);
    this.actionMarkers = new ActionMarkersTrace(this.mapInstance);
    this.animPolyline = new AnimPolylineTrace(this.mapInstance);
    this.animPolyline.setTimeAwareAnimation(this.anim);
    this.actionsPolyline = new ActionsPolylineTrace(this.mapInstance);
    this.actionsPolyline.setTimeAwareAnimation(this.anim);
  }

  get map(): HtMap {
    return this.mapInstance.map;
  }

  trace(user: IPlacelineMod, map?) {
    const selectedSegment = user ? user.selectedSegment : null;
    this.setHighlightId(user);
    let userSegments = user && user.segments ? user.segments : [];
    let segType = this.getSegmentTypes(userSegments);
    let lastSegment = segType.lastSegment;
    let restTrips = segType.tripSegment.pop();
    this.traceStops(segType.stopSegment, selectedSegment, lastSegment);
    if (lastSegment) {
      var string = this.getTimeAwarePolyline(lastSegment);
      if(string) {
        //todo infer toNotTraceItem from animMixin trace
        this.userMarker.toNotTraceItem = true;
        this.animPolyline.toNotTraceItem = true;
        this.actionsPolyline.toNotTraceItem = true;
        // this.animPolyline.trace(restTrips);
        this.anim.updatePolylineString(string);
      } else {
        this.animPolyline.toNotTraceItem = false;
        this.userMarker.toNotTraceItem = false;
        this.actionsPolyline.toNotTraceItem = false;
        // if (!selectedSegment) this.animPolyline.trace(restTrips);
        this.anim.clear();
      }
      this.userMarker.trace(user);
      this.traceAnimPolyline(restTrips, selectedSegment);
      this.actionsPolyline.setConnector(this.userMarker.getEntity());
      this.actionsPolyline.trace(user)
    } else {
      this.anim.clear();
      this.userMarker.clear();
      this.animPolyline.clear();
      this.actionsPolyline.clear();

    }
    this.traceSegments(segType.tripSegment, selectedSegment);
    this.traceAction(user, selectedSegment);
    // this.actionsPolyline.setConnector(this.userMarker.getEntity());
    // this.actionsPolyline.trace(user)
  };

  traceAnimPolyline(restTrip, selectedSegment) {
    if (!restTrip) {
      this.animPolyline.clear();
    } else if (!selectedSegment || selectedSegment.id === restTrip.id) {
      this.animPolyline.trace(restTrip);
    } else {
      this.animPolyline.clear();
    }
  }

  traceStops(stops: ISegment[], selectedSegment, lastSegment) {
    if (selectedSegment) {
      stops = selectedSegment.type == 'stop' ? [selectedSegment] : [];
    }
    this.stopMarkers.trace(stops);
  }

  traceSegments(trips: ISegment[] = [], selectedSegment) {
    if (selectedSegment) {
      let matchedTrip = trips.find(trip => trip.id === selectedSegment.id);
      trips = matchedTrip ? [matchedTrip] : [];
    }
    this.segmentsPolylines.trace(trips);
  }


  traceAction(user: IUserData, selectedSegment) {
    let actions = user && user.actions && !selectedSegment ? user.actions : [];
    let filteredActions = _.filter(actions, (action: IAction) => {
      return htAction(action).isValidMarker();
    });
    if (this.actionMarkers) this.actionMarkers.trace(filteredActions);
  }

  setHighlightId(user: IPlacelineMod) {
    const data = user && !user.selectedSegment ? user.highlightedSegment : null;
    const id = data ? data.id : null;
    this.stopMarkers.highlightedId = id;
    this.segmentsPolylines.highlightedId = id;
    this.animPolyline.highlightedId = id;
  }

  getTimeAwarePolyline(segment: ISegment) {
    return segment ? segment.time_aware_polyline : null
  }

  extendBounds(bounds) {
    bounds = this.stopMarkers.extendBounds(bounds);
    bounds = this.segmentsPolylines.extendBounds(bounds);
    bounds = this.animPolyline.extendBounds(bounds);
    bounds = this.actionMarkers.extendBounds(bounds);
    // bounds = this.userMarker.extendBounds(bounds);
    // console.log(bounds, "final");
    return bounds;
  }


  protected getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(
      userSegments,
      (segmentType: ISegmentType, segment: ISegment) => {
        segmentType.lastSegment = segment;
        if (segment.type == "stop") {
          if (segment.location && segment.location.geojson)
            segmentType.stopSegment.push(segment);
        } else {
          if (segment.encoded_polyline) segmentType.tripSegment.push(segment);
        }
        return segmentType;
      },
      { tripSegment: [], stopSegment: [], lastSegment: null }
    );
  }

}

export const PlacelineTrace = CompoundDataObservableMixin(Placeline);

export interface ISegmentType {
  tripSegment: ISegment[];
  stopSegment: ISegment[];
  lastSegment?: ISegment
}

export interface HtSegmentsTraceOptions {
  mapInstance: MapInstance
}
