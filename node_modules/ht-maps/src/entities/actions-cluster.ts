import { htAction} from "ht-data";
import {DateString, HMString, NameCase, TimeString} from "ht-utility";
import {ItemClassFactoryConfig, itemsFactory} from "../base/map-items-factory";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {PopupMixin} from "../mixins/popup-renderer";
import {ClusterMixin} from "../mixins/clusters";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {Entity, StyleFunct} from "../interfaces";
import {HtPosition} from "ht-models";
import {MapInstance} from "../map-utils/map-instance";
import {TraceMixin} from "../mixins/trace";
import {HtBounds} from "ht-map-wrapper";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {DivMarkersMixin} from "../mixins/div-markers-renderes";
import {IPathBearingTime} from "ht-models";
declare const RichMarkerPosition: any;
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class ActionsCluster {
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
    return htAction(data).getPosition();
  }
  getDivContent(action) {
    let icon = `<div class="action-marker flex-row">
<span style="margin: auto">${NameCase(action.type[0])}</span>
</div>`;
    return icon
  }

  getInfoContent(item) {
    function htShow(item, style = "flex") {
      return `display: ${item ? style : "none"}`;
    }
    let userName = item.user ? item.user.name : '';
    return `<div class="flex-column flex-center" style="min-width: 180px">
<div class="">
    <div class="text-center">${NameCase(item.type)}
    <span style="${htShow(item.display.duration_remaining && !item.display.show_summary)}"> in ${HMString(item.display.duration_remaining/60)}</span>
    <span style="${htShow(!!item.completed_at)}"> completed at ${TimeString(item.completed_at)}</span>
   
    </div>
</div>
    <div class="text-muted text-center" style="${htShow(!!item.completed_at)}"> ${DateString(item.completed_at)}</div>
<div class="text-center">${NameCase(userName)}<span style="${htShow(!!item.lookup_id, 'block')}"> | #${item.lookup_id}</span></div>
</div>`
  }

  traceEffect() {

  }

};

export const ActionsClusterTrace = DataObservableMixin(
  PopupMixin(ClusterMixin(TraceMixin(ExtendBoundsMixin(DivMarkersMixin(MarkersMixin(StyleMixin(
    MapItemsMixin(ActionsCluster)
  )))))))
);
