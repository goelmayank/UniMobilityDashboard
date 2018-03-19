import {SingleItemMixin} from "../mixins/single-item";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {TraceMixin} from "../mixins/trace";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {MapInstance} from "../map-utils/map-instance";
import {IAction, IPlace, HtPosition, IActionMod} from "ht-models";
import {Entity, StyleFunct} from "../interfaces";
import {IPathBearingTime} from "ht-models";
import {CircleMixin} from "../mixins/circle-renderer";
import {Color} from "ht-utility";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
declare const RichMarkerPosition: any;
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import {DestinationMap} from "./destination-marker";
import {FollowerMixin, IFollower} from "../mixins/follower";
import {DivMarkersMixin} from "../mixins/div-markers-renderes";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";
import {HtBounds} from "ht-map-wrapper";

export class StartMarker implements IFollower{
  mapInstance: MapInstance;
  name =  "Start marker";
  constructor(mapInstance) {
    this.mapInstance = mapInstance
  }
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case 'google': {
          return {
            default: {
              // flat: true,
              // anchor: RichMarkerPosition.MIDDLE,
              // zIndex: 1
            },
            popup: {
              pixelOffset: new google.maps.Size(0, -5),
            }
          }
        }
        case 'leaflet': {
          return {
            default: {
              zIndexOffset: 10,
              iconSize: [20, 20],
              className: "destination-marker"
            }
          }
        }
      }
    }
  };

  trace(mapItem) {

  }

  getPosition(data: IAction): HtPosition {
    let place: IPlace = data.started_place;
    if (place && place.location) {
      return {lat: place.location.coordinates[1], lng: place.location.coordinates[0]}
    } else {
      return null
    }
  }

  getDivContent() {
    return `<div style="width: 20px; height: 20px; background: #9013FE; border-radius: 50%"></div>`
  }

};

export const StartMarkerTrace =  ExtendBoundsMixin(
  DataObservableMixin(
    TraceMixin(DivMarkersMixin(MarkersMixin(
      StyleMixin(
        MapItemsMixin(StartMarker)
      ))
    ))
  )
)