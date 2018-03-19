import { MarkerDataConfig, StyleFunct } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export class MarkersBase
  implements MarkerDataConfig<any>, MarkersFactoryConfig {
  // styleFunct: StyleFunct;
  mapInstance: MapInstance;
  constructor(public renderConfig, public styleFunct: StyleFunct, public name?) {
    this.mapInstance = renderConfig.mapInstance || new MapInstance();
  }

  getPosition(data) {
    return this.renderConfig.getPosition(data);
  }

  getInfoContent(data) {
    return this.renderConfig.getInfoContent(data);
  }
}

export interface MarkersFactoryConfig {
  renderConfig: MarkerDataConfig<any>;
  styleFunct: StyleFunct;
}
