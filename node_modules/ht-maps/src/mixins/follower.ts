import { Constructor } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IFollowerBase {
  trace(data: any, map?): void;
  // getStyle: (styleType?) => object;
}

export interface IFollower {
  trace(mapItem, map?) : void
}

export function FollowerMixin<TBase extends Constructor<IFollowerBase>>(Base: TBase) {
  return class extends Base {
    followers: IFollower[];
    trace(data) {
      super.trace(data);;
      this.followers.forEach((follower) => {
        follower.trace(this)
      })
    }
  };
}
