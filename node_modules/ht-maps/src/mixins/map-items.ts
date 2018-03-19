import {Constructor, Entities, Entity} from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IMapItemsBase {
  mapInstance: MapInstance
  trackBy?(datum): string;
  trackAnimationBy?(datum): string;
}

export function MapItemsMixin<TBase extends Constructor<IMapItemsBase>>(Base: TBase) {
  return class extends Base {
    entities: Entities<any> = {};

    getEntity(id?: string): Entity<any> | null {
      if (!this.entities) return null;
      if (id) return this.entities[id];
      let keys = Object.keys(this.entities);
      if (keys.length == 0) return null;
      let key = keys[0];
      return this.entities[key];
    };

    trackBy(datum) {
      return super.trackBy ? super.trackBy(datum) : datum.id;
    }

    trackAnimationBy(datum) {
      return super.trackAnimationBy ? super.trackAnimationBy(datum) : this.trackBy(datum)
    }

  };
}