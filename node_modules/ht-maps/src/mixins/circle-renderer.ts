import { Constructor } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface ICircleMarkersBase {
  mapInstance: MapInstance
  // getStyle: (styleType?) => object;
}

export function CircleMixin<TBase extends Constructor<ICircleMarkersBase>>(Base: TBase) {
  return class extends Base {
    getItem(data) {
      return this.mapInstance.mapUtils.getCircleMarker();
    }
  };
}
