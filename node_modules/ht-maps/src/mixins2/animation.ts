import { TimeAwareAnimation} from "time-aware-polyline";
import { EntityState } from "../global/entity-state";

export class AnimationClass {
    animation: TimeAwareAnimation
    data: EntityState
    setTimeAwareAnimation (animation: TimeAwareAnimation) {
        this.animation = animation || this.animation;
        this.animation.updateEvent.subscribe('update', ({path, bearing}) => {
        //   let entity = this.getEntity();
          this.data.setState('pathBeaing', {path, bearing})
        //   if(entity) this.update(entity, {path, bearing})
        });
      }
}