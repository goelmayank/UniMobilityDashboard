import { htUser } from "ht-data";
import { userDivFactory } from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;
import { HtPosition } from "ht-models";
import {Entity, StyleFunct} from "../interfaces";
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
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export const currentUserConfig: ItemClassFactoryConfig = {
  renderConfig: {
    getPosition(data): HtPosition {
      return htUser(data).getPosition();
    },
    getDivContent(data) {
      return userDivFactory(data);
    }
  },

  styleFunct: {
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
              // iconAnchor: point(15, 43)
              iconAnchor: [15, 43]
            }
          }
        }
      }
    }
  },
  typeConfig: {
    isSingleItem: true,
    isDiv: true,
    hasDataObservable: false
  },
  name: "Current user"
};

export const currentUserTrace = () => {
  return itemsFactory(currentUserConfig);
};

export class CurrentUser {
  name = "Current user";
  animation?: TimeAwareAnimation;

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
              // iconAnchor: point(15, 43)
              iconAnchor: [15, 43]
            }
          }
        }
      }
    }
  }

  constructor(public mapInstance: MapInstance) {}

  getPosition(data): HtPosition {
    return htUser(data).getPosition();
  };

  getDivContent(data) {
    return userDivFactory(data);
  }
}

export const CurrentUserTrace = AnimationMixin(SingleItemMixin(DivMarkersMixin(
  TraceMixin(MarkersMixin(StyleMixin(
    MapItemsMixin(CurrentUser)
  )))
)));
// export class CurrentUser {
//   name = "Current user";
//   styleFunct: StyleFunct = {
//     google: {
//       default: {
//         flat: true,
//         anchor: RichMarkerPosition.BOTTOM_CENTER,
//       }
//     },
//     leaflet: {
//       default: {
//
//       }
//     }
//   };
//
//   getPosition(data): HtPosition {
//     return htUser(data).getPosition()
//   };
//
//   getDivContent(data) {
//     return userDivFactory(data)
//
//   }
// };
//
// export const CurrentUserTrace = mapItemsFactory(CurrentUser, {
//   isSingleItem: true,
//   isDiv: true,
//   hasDataObservable: false
// });
