import { Constructor } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {HtPosition} from "ht-models";
import {IPathBearingTime} from "ht-models";

export interface IDivMarkersBase {
  getDivContent: (data, bearing?: number) => string;
  getStyle: (type?) => object;
  update(entity, pathBearing?): void;
  mapInstance: MapInstance
}

export function DivMarkersMixin<TBase extends Constructor<IDivMarkersBase>>(
  Base: TBase
) {
  return class extends Base {

    getItem(data) {
      return this.mapInstance.mapUtils.getDivMarker();
    }
    update({ item, data }, pathBearing?: IPathBearingTime) {
      const bearing = pathBearing ? pathBearing.bearing : null;
      let content = this.getDivContent(data, bearing);
      this.setContent({ item, content });
      super.update({ item, data }, pathBearing);
    }

    setContent({ item, content }) {
      this.mapInstance.mapUtils.setDivContent(item, content, this.getStyle());
    }
    setStyle(entity) {
      // let style = this.getStyle();
      // GlobalMap.mapUtils.setDivMarkerStyle(item, style)
    }
  };
}
