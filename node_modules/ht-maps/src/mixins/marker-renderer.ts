import { Constructor, Entities } from "../interfaces";
import {HtBounds, HtMap} from "ht-map-wrapper";
import { HtPosition } from "ht-models";
import * as _ from "underscore";
import {MapInstance} from "../map-utils/map-instance";
import {IPathBearingTime} from "ht-models";
import {HtCustomEvent, IEventSub} from "ht-utility";

export interface IMarkersBase {
  getStyle: (styleType?) => object;
  getPosition: (data) => HtPosition;
  forceExtendBounds?: boolean;
  mapInstance: MapInstance;
  toNotSetMap?: boolean;
  trackBy(datum): string;
}

export function MarkersMixin<TBase extends Constructor<IMarkersBase>>(
  Base: TBase
) {
  return class extends Base {
    entities: Entities<any> = {};
    event = new HtCustomEvent();
    htShow(item) {
      return `display: ${item ? "flex" : "none"}`;
    }

    getItem(data) {
      return this.mapInstance.mapUtils.getMarker();
    }

    getBounds(item, bounds?) {
      return this.mapInstance.mapUtils.extendItemBounds(item, bounds, this.forceExtendBounds);
    }

    update({ item, data }, positionBearing?: IPathBearingTime) {
      let pathPosition = positionBearing && positionBearing.path.length ?
        positionBearing.path[positionBearing.path.length - 1] : null;
      let position = pathPosition || this.getPosition(data);
      if (position) this.mapInstance.mapUtils.updatePosition(item, position);
      if (!this.toNotSetMap) this.mapInstance.mapUtils.setMap(item, this.mapInstance.map);
      const id = this.trackBy(data);
      this.event.next('update-'+ id, {item, data})
    }

    /**
     *
     * @param id string return trackBy
     * @returns {{subscribe: (cb) => IEventSub}}
     */
    onEntityUpdate(id): {subscribe: (cb) => IEventSub} {
      const eventName = `update-${id}`;
      return {
        subscribe: (cb) => {
          return this.event.subscribe(eventName, cb)
        }
      }
    }

    removeItem(item) {
      this.mapInstance.mapUtils.clearItem(item);
    }

    removeAll(entities) {
      _.each(entities, (entity: any) => {
        this.removeItem(entity.item);
      });
      this.entities = {};
    }

    clear() {
      const entities = this.entities;
      this.removeAll(entities)
    }

    clearItem({item, data}) {
      this.removeData(data);
      this.removeItem(item);
    }

    removeData(data) {
      let id = this.trackBy(data);
      if (this.entities[id]) delete this.entities[id];
    }
  };
}
