import {HeatmapMixin} from "../mixins/heatmap";
import {htAction} from "ht-data";
import { HtPosition } from "ht-models"
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {StyleMixin} from "../mixins/styles";
import {Entity, StyleFunct} from "../interfaces";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {HtBounds} from "ht-map-wrapper";
import {MapInstance} from "../map-utils/map-instance";
import {IPathBearingTime} from "ht-models";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class ActionsHeatmap {
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {

            }
          }
        }
        case "leaflet": {
          return {
            default: {
              radius: 7,
              minOpacity: 0.6
            }
          }
        }
      }
    }
  };

  constructor(public mapInstance: MapInstance) {}

  getPosition(item): HtPosition {
    return {
      lat: item.completed_place__location[1],
      lng: item.completed_place__location[0],
    }
  };

};

export const ActionsHeatmapTrace = ExtendBoundsMixin(
  DataObservableMixin(ExtendBoundsMixin(HeatmapMixin(StyleMixin(
    MapItemsMixin(ActionsHeatmap)
  ))))
);