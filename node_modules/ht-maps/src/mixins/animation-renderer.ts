import {Constructor, Entity} from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {TimeAwareAnimation} from "time-aware-polyline";
import {IPathBearingTime} from "ht-models";
import {HtPosition} from "ht-models";

export interface IAnimationBase {
  animation?: TimeAwareAnimation;
  getEntity(): Entity<any>
  // mapInstance: MapInstance
  // getTimeAwarePolyline: (data) => string,
  // update(entity): void;
  // getDivContent(bearing): string;
  update(entity, pathBearing: IPathBearingTime): void;
// getStyle: (styleType?) => object;
}

export function AnimationMixin<TBase extends Constructor<IAnimationBase>>(Base: TBase) {
  return class extends Base {
    // bearing: number = 0;
    // item;
    isAnimated: boolean = true;
    setTimeAwareAnimation (animation: TimeAwareAnimation) {
      this.animation = animation || new TimeAwareAnimation();
      this.animation.updateEvent.subscribe('update', ({path, bearing}) => {
        let entity = this.getEntity();
        if(entity) this.update(entity, {path, bearing})
      });
    }


  };
}
