import { Constructor } from "../interfaces";
import { positionTime } from "../helpers/position-time-helper";
import {HtBounds} from "ht-map-wrapper";
import {MapInstance} from "../map-utils/map-instance";
import {ITimeAwarePoint} from "ht-models";
import {IPathBearingTime} from "ht-models";
import {HtPosition} from "ht-models";

export interface IPolylinesBase {
  getPath?(path: ITimeAwarePoint[]): HtPosition[];
  getEncodedPositionTime;
  getEncodedPath(data): any;
  getStyle: (string?) => object;
  mapInstance: MapInstance;
  toNotSetMap?: boolean;
}

export function PolylinesMixin<TBase extends Constructor<IPolylinesBase>>(
  Base: TBase
) {
  return class extends Base {
    positionTimeArray = [];

    getItem(data) {
      return this.mapInstance.mapUtils.getPolyline();
    }

    getBounds(item, bounds?): HtBounds {
      return this.mapInstance.mapUtils.extendBoundsWithPolyline(item, bounds);
    }

    update({ item, data }, pathBearing: IPathBearingTime) {
      if (this.getPath || pathBearing) {
        let path = pathBearing ? pathBearing.path : this.getPath(data);
        this.mapInstance.mapUtils.setPath(
          item,
          path
        )
      }
      else if (this.getEncodedPositionTime) {
        this.positionTimeArray = positionTime.decode(this.getEncodedPositionTime(data));
        this.mapInstance.mapUtils.setPathPositionTimeArray(
          item,
          this.positionTimeArray
        );
      } else {
        this.mapInstance.mapUtils.setEncodedPath(item, this.getEncodedPath(data));
      }
      if (!this.toNotSetMap) this.mapInstance.mapUtils.setMap(item, this.mapInstance.map);
    }

    setItemStyle(item, style) {
      this.mapInstance.mapUtils.setPolylineStyle(item, style);
    }
  };
}
