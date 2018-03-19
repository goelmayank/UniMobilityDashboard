import { Constructor, Entities } from "../interfaces";
import { HtPosition } from "ht-models";
import {HtBounds} from "ht-map-wrapper";
import {MapInstance} from "../map-utils/map-instance";

export interface IHeatmapBase {
  getStyle: (styleType?) => object;
  getPosition: (data) => HtPosition;
  mapInstance: MapInstance
}

export function HeatmapMixin<TBase extends Constructor<IHeatmapBase>>(
  Base: TBase
) {
  return class extends Base {
    map;
    heatmap;
    forceExtendBounds = true;
    entities: any[];
    constructor(...args: any[]) {
      super(...args);
      let style = this.getStyle();
      this.heatmap = this.mapInstance.mapUtils.getHeatmap(style);
    }

    trace(items: any[], map?) {
      this.entities = items.map(item => ({item}));
      this.map = map || this.mapInstance.map;
      if (this.map) {
        if(items) {
          let latLngs = items.reduce((acc, item) => {
            let position = this.getPosition(item);
            return position ? [...acc, position] : acc;
          }, []);
          this.mapInstance.mapUtils.updateHeatMapLatlng(latLngs, this.heatmap);
          this.mapInstance.mapUtils.setMap(this.heatmap, this.map)
        } else {
          this.clear()
        }
      } else {
        console.warn("Map is not initialized");
        return false;
      }
    }


    getBounds(item, bounds?: HtBounds) {
      let position = this.getPosition(item);
      return this.mapInstance.mapUtils.extendBounds(position, bounds)
    }

    clear() {
      this.trace([])
    }
  };
}
