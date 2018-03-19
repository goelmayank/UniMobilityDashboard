// import { GlobalMap } from "../global/map-service";
import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import {HtBounds, HtMap} from "ht-map-wrapper";
import {MapInstance} from "../map-utils/map-instance";

export interface IClusterBase {
  entities: Entities<any>;
  mapInstance: MapInstance,
  trace (items: any[], map?: HtMap): void
  // map: HtMap;
  removeItem(item): void;
  removeAll(entities): void;
}
export function ClusterMixin<TBase extends Constructor<IClusterBase>>(
  Base: TBase
) {
  return class extends Base {
    forceExtendBounds = true;
    toNotSetMap = true;
    cluster;
    constructor(...arg: any[]) {
      super(...arg);
      this.addCluster();
    }

    trace(items, map?) {
      if (items && items.length) {
        this.clearAllClusters(items)
      }
      super.trace(items, map);
    }

    addCluster() {
      this.mapInstance.addCluster(this);
    }

    traceEffect() {
      if (this.cluster) {
        let userMarkerArray = _.values(this.entities as Entities<any>).map(
          userMarker => {
            return userMarker.item;
          }
        );
        this.mapInstance.mapUtils.addMarkersToCluster(
          this.cluster,
          userMarkerArray,
          this.mapInstance.map
        );
      }
    }

    getBounds(item, bounds?): HtBounds {
      return this.mapInstance.mapUtils.extendItemBounds(item, bounds, true);
    }

    removeItem(item) {
      this.mapInstance.mapUtils.removeClusterMarker(this.cluster, item);
      super.removeItem(item);
    }

    removeAll(entities) {
      this.cluster && this.mapInstance.mapUtils.removeClusterMarkers(this.cluster);
      this.entities = {}
      // super.removeAll(entities);
    };

    clearAllClusters(data: any[]) {
      const entitiesCount = Object.keys(this.entities).length;
      if(entitiesCount > 400 && entitiesCount - data.length > 100) {
        this.removeAll(this.entities)
      }
    }
  };
}
