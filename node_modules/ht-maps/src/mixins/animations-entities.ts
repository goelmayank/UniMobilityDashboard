import {Constructor, Entity} from "../interfaces";
import {IPathBearingTime} from "ht-models";
import {TimeAwareAnimation} from "time-aware-polyline";
import {Subscription} from "rxjs/Subscription";

export interface IAnimationsEntitiesBase {
  getEntity(id?): Entity<any>,
  getTimeAwarePolyline?(data): string;
  clearItem(entity): void;
  update(entity, pathBearing: IPathBearingTime): void;
  trackBy(datum): string;
  trackAnimationBy(datum): string;
}

export function AnimationsEntitiesMixin<TBase extends Constructor<IAnimationsEntitiesBase>>(Base: TBase) {
  return class extends Base {
    // bearing: number = 0;
    // item;
    isAnimated: boolean = true;
    animationEntities: AnimationsEntities;
    toNotTraceItem = false;
    subs: {
      [id: string]: any
    } = {};

    setTimeAwareAnimationEntity (animationEntity?: AnimationsEntities) {
      this.animationEntities = animationEntity || new AnimationsEntities();
    };

    clearItem(entity) {
      const id = this.trackBy(entity.data);
      const animId = entity.data.id;
      this.animationEntities.clearItem(animId);
      this.clearSub(id);
      super.clearItem(entity)
    }

    update(entity, pathBearing) {
      const id = this.trackBy(entity.data);
      const animId = entity.data.id;
      this.initSub(id, animId);
      const encodedString = this.getTimeAwarePolyline ? this.getTimeAwarePolyline(entity.data) : null;
      if (encodedString) {
        this.animationEntities.update(id, encodedString)
      } else {
        // super.update(entity, {path, bearing})
      }
    };

    initSub(id, animId?: string) {
      animId = animId || id;
      const sub = this.subs[id];
      if (sub) {

      } else {
        if (this['name'] == "action user") console.log("id sub craete sub");
        const newsub = this.animationEntities
          .getEntity(animId)
          .updateEvent
          .subscribe('update', ({path, bearing}) => {
            const entity = this.getEntity(id);
            if (entity) {
              super.update(entity, {path, bearing})
            }
          });

        this.subs[id] = newsub;

      }
    }

    clearSub(id) {
      const sub = this.subs[id];
      sub.unsubscribe();
      delete this.subs[id];
    }

  };
}

export class AnimationsEntities {
  enitites: {
    [id: string]: TimeAwareAnimation
  } = {};


  clearItem(id) {
    const entity = this.enitites[id];
    entity.clear();
    delete this.enitites[id]
  }

  update(id, polyline: string) {
    const entity = this.getEntity(id);
    entity.updatePolylineString(polyline);
  };

  getEntity(id: string) {
    const entity = this.enitites[id];
    if (entity) {
      return entity;
    } else {
      const newEntity = new TimeAwareAnimation();
      this.enitites[id] = newEntity;
      return newEntity;
    }
  }

}