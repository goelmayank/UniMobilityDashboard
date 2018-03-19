import {AnimationMixin} from "../mixins/animation-renderer";
import {MapInstance} from "../map-utils/map-instance";
import {MarkersMixin} from "../mixins/marker-renderer";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {SegmentPolylines} from "./segment-polylines";
import {TraceMixin} from "../mixins/trace";
import {SingleItemMixin} from "../mixins/single-item";
import {StyleMixin} from "../mixins/styles";
import {Entity, StyleFunct} from "../interfaces";
import {HtPosition, ITimeAwarePoint, IPlacelineMod} from "ht-models";
import {TimeAwareAnimation} from "time-aware-polyline";
import {IPathBearingTime} from "ht-models";
import { positionTime } from "../helpers/position-time-helper";
import { Constructor } from "../interfaces";
import {htAction} from "ht-data";
import {Color} from "ht-utility";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";
import {HtBounds} from "ht-map-wrapper";

export class ActionsPolyline extends SegmentPolylines {
  lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };

  styleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {
              strokeColor: Color.grey3,
              strokeOpacity: 0,
              strokeWeight: 5,
              icons: [{
                icon: {
                  path: 'M 0,-1 0,0',
                  strokeOpacity: 1,
                  scale: 4
                },
                offset: '0',
                repeat: '13px'
              }],
            },
            highlight: {
              strokeColor: Color.grey2,
              strokeOpacity: 1,
              strokeWeight: 5
            },
            fade: {
              strokeColor: Color.grey2,
              strokeOpacity: 0.2,
              strokeWeight: 2
            }
          }
        };
        case "leaflet": {
          return {
            default: {
              weight: 5,
              color: Color.grey4,
              opacity: 1,
              dashArray: "7 10"
            },
            highlight: {
              weight: 5,
              color: Color.grey2,
              opacity: 1
            },
            fade: {
              weight: 2,
              color: Color.grey2,
              opacity: 0.2
            }
          }
        }
      }
    },
  };
  mapInstance: MapInstance;
  animation: TimeAwareAnimation;
  name = "action polyline";

  getPathFromData(data: IPlacelineMod) {
    return data ? data.actions.reduce((path, action) => {
      return htAction(action).getExpectedPosition() && !action.completed_at ? [...path, htAction(action).getPosition()] : path
    }, []) : null
  }
}

export const ActionsPolylineTrace = ConnectorMixin(
  AnimationMixin(SingleItemMixin(
    TraceMixin(ExtendBoundsMixin(
      PolylinesMixin(MarkersMixin(StyleMixin(
        MapItemsMixin(ActionsPolyline)
      )))))
  ))
);


export interface IConnectorBase {
  mapInstance: MapInstance;
  getPathFromData(data): HtPosition[] | null,
  toNotSetMap?: boolean;
  clear(): void;
}

export function ConnectorMixin<TBase extends Constructor<IConnectorBase>>(
  Base: TBase
) {
  return class extends Base {
    positionTimeArray = [];
    connector;

    /*
    Need to ensure connector is traced before this class is traced
     */
    setConnector(entity) {
      this.connector = entity ? entity.item : null;
    }

    getConnectorPosition() {
      return this.connector ? this.mapInstance.mapUtils.getItemPosition(this.connector) : null
    }

    update({ item, data }, pathBearing: IPathBearingTime) {
      let startPosition;
      if (pathBearing) {
        const path = pathBearing.path;
        startPosition = path[path.length - 1]
      } else {
        startPosition = this.getConnectorPosition();
      };
      const dataPath = this.getPathFromData(data);
      if (dataPath && startPosition) {
        const finalPath = [startPosition, ...dataPath];
        this.mapInstance.mapUtils.setPath(
          item,
          finalPath
        );
        this.mapInstance.mapUtils.setMap(item, this.mapInstance.map);
      } else {
        this.clear()
      }

    }
  };
}
