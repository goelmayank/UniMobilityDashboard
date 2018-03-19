import { DivMarkerDataConfig, StyleFunct } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export class DivMarkersBase
  implements DivMarkerDataConfig<any>, DivMarkersFactoryConfig {
  // styleFunct: StyleFunct;
  mapInstance: MapInstance;
  constructor(public renderConfig, public styleFunct) {
    this.mapInstance = renderConfig.mapInstance || new MapInstance();
  }

  getPosition(data) {
    return this.renderConfig.getPosition(data);
  }

  getInfoContent(data) {
    return this.renderConfig.getInfoContent(data);
  }

  getDivContent(data) {
    return this.renderConfig.getDivContent(data);
  }
}

export interface DivMarkersFactoryConfig {
  renderConfig: DivMarkerDataConfig<any>;
  styleFunct: StyleFunct;
}
