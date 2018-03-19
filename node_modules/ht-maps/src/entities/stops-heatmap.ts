import {HeatmapMixin} from "../mixins/heatmap";
import { HtPosition, IPlaceHeat } from "ht-models"
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {StyleMixin} from "../mixins/styles";
import {Entity, StyleFunct} from "../interfaces";
import {HtBounds} from "ht-map-wrapper";
import {MapInstance} from "../map-utils/map-instance";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {IPathBearingTime} from "ht-models";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class StopsHeatmap {
  name = "stop heatmap";
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
  mapInstance: MapInstance
  constructor(mapInstance: MapInstance) {
    this.mapInstance = mapInstance
  }

  getPosition(item: IPlaceHeat): HtPosition {
    return {
      lat: item.place__location[1],
      lng: item.place__location[0],
      weight: item.intensity
    }
  }

};

export const StopsHeatmapTrace = ExtendBoundsMixin(
  DataObservableMixin(HeatmapMixin(StyleMixin(
    MapItemsMixin(StopsHeatmap)
  )))
);