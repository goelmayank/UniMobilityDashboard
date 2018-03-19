import { PolylineDataConfig, StyleFunct } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export class PolylinesBase
  implements PolylinesFactoryConfig, PolylineDataConfig<any> {
  // styleFunct: StyleFunct;
  mapInstance: MapInstance;
  constructor(public renderConfig: PolylineDataConfig<any>, public styleFunct) {
    this.mapInstance = renderConfig.mapInstance || new MapInstance();
  }

  getEncodedPath(data) {
    return this.renderConfig.getEncodedPath(data);
  }

  getEncodedPositionTime(data) {
    return this.renderConfig.getEncodedPositionTime(data);
  }
}

export interface PolylinesFactoryConfig {
  renderConfig: PolylineDataConfig<any>;
  styleFunct: StyleFunct;
}
