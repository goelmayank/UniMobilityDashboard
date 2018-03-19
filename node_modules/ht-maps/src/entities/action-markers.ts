import { Color } from "ht-utility";
import { htAction } from "ht-data";
import { HtPosition } from "ht-models";
import {
  ItemClassFactoryConfig,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import {MarkersMixin} from "../mixins/marker-renderer";
import {MapInstance} from "../map-utils/map-instance";
import {StyleMixin} from "../mixins/styles";
import {CircleMixin} from "../mixins/circle-renderer";
import {Entity, StyleFunct} from "../interfaces";
import {HtBounds} from "ht-map-wrapper";
import {TraceMixin} from "../mixins/trace";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {IPathBearingTime} from "ht-models";
import {DivMarkersMixin} from "../mixins/div-markers-renderes";
import {NameCase} from "ht-utility";
declare const RichMarkerPosition: any;
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class ActionMarkers {
  name = "Action";
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case 'google': {
          return {
            default: {
              flat: true,
              anchor: RichMarkerPosition.MIDDLE,
              zIndex: 1
            },
            popup: {
              pixelOffset: new google.maps.Size(0, -5),
            }
          }
        }
        case 'leaflet': {
          return {
            default: {
              iconAnchor: [12, 12]
              // iconSize: [35, 35],
              // className: 'current-action-marker',
              // iconAnchor: point(15, 43)
              // iconAnchor: [15, 43]
            },
            popup: {
              // offset: point(0, -35),
              offset: [0, -5],
              closeButton: false
            }
          }
        }
      }
    }
  };

  constructor(public mapInstance: MapInstance) {}

  getPosition(data): HtPosition {
    let posObj = htAction(data).getPositionsObject();
    return posObj ? posObj.position : null

  }

  getDivContent(action) {
    let icon = `<div class="action-marker flex-row">
<span style="margin: auto">${NameCase(action.type[0])}</span>
</div>`;
    return icon
  }
}

export const ActionMarkersTrace = ExtendBoundsMixin(
  TraceMixin(
    DivMarkersMixin(MarkersMixin(StyleMixin(
      MapItemsMixin(ActionMarkers)
    )))
  )
);

