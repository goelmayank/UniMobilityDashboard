import { htUser } from "ht-data";
import { userDivFactory } from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;
import { HtPosition, IAction } from "ht-models";
import {Entities, Entity, StyleFunct} from "../interfaces";
import {
  ItemClassFactoryConfig,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import {MapInstance} from "../map-utils/map-instance";
import {SingleItemMixin} from "../mixins/single-item";
import {DivMarkersMixin} from "../mixins/div-markers-renderes";
import {TraceMixin} from "../mixins/trace";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {HtBounds} from "ht-map-wrapper";
import {AnimationMixin} from "../mixins/animation-renderer";
import {TimeAwareAnimation} from "time-aware-polyline";
import {IPathBearingTime} from "ht-models";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {AnimationsEntities, AnimationsEntitiesMixin} from "../mixins/animations-entities";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class ActionUser {
  name = "action user";
  animation?: TimeAwareAnimation;
  entities: Entities<IAction>;
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {
              flat: true,
              anchor: RichMarkerPosition.BOTTOM_CENTER
            }
          }
        };
        case "leaflet": {
          return {
            default: {
              zIndexOffset: 10,
              iconSize: [60, 60],
              className: "action-marker"
              // iconAnchor: point(15, 43)
              // iconAnchor: [0, 0]
            }
          }
        }
      }
    }
  };
  setTimeAwareAnimationEntity: (animationEntity?: AnimationsEntities) => void;

  setData$: (data$: Observable<any[]>) => void;

  constructor(public mapInstance: MapInstance) {}

  getPosition(data): HtPosition {
    return htUser(data.user).getPosition();
  };

  trackBy(action: IAction) {
    return action.user.id
  }

  trackAnimationBy(action: IAction) {
    return action.id
  }

  getDivContent(data) {
    const content = `
    <div style="border-radius: 50%; height: 60px; width: 60px; background: rgba(95,143,213,0.67) ">
  <div style="height: 30px; width: 30px; background-image: url('${data.user.photo}'); background-repeat: no-repeat;
  background-size: cover;     top: 15px;
    position: relative;
    left: 15px;
    border-radius: 50%;"></div>
</div> 
    `;
    return content
  };
}

export const ActionUserTrace = DataObservableMixin(
  ExtendBoundsMixin(
    AnimationsEntitiesMixin(DivMarkersMixin(
      TraceMixin(MarkersMixin(StyleMixin(
        MapItemsMixin(ActionUser)
      )))
    ))
  )
);
