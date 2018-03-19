import { segmentPolylineStyles } from "../styles/segment-polyline-styles";
import { ISegment, HtPosition } from "ht-models";
import {
  ItemClassFactoryConfig,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import {MapInstance} from "../map-utils/map-instance";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {CircleMixin} from "../mixins/circle-renderer";
import {PopupMixin} from "../mixins/popup-renderer";
import {TraceMixin} from "../mixins/trace";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {HtBounds} from "ht-map-wrapper";
import {Entity, StyleFunct} from "../interfaces";
import {IPathBearingTime} from "ht-models";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class SegmentPolylines {
  styleFunct: StyleFunct = segmentPolylineStyles;
  name = "segment polyline";

  constructor(public mapInstance: MapInstance) {}

  getEncodedPath(data) {
    return data.encoded_polyline;
  };

  getEncodedPositionTime(data: ISegment) {
    return data.time_aware_polyline;
  }

  getPosition(): HtPosition {
    return {lat: 0, lng: 0}
  }
}

export const SegmentPolylinesTrace = TraceMixin(ExtendBoundsMixin(PolylinesMixin(MarkersMixin(StyleMixin(
  MapItemsMixin(SegmentPolylines)
)))))
// export class SegmentPolylines {
//   styleFunct = segmentPolylineStyles;
//
//   getEncodedPath(data) {
//     return data.encoded_polyline;
//   };
//
//   getEncodedPositionTime(data: ISegment) {
//     return data.time_aware_polyline
//   }
// }
//
// export const SegmentPolylinesTrace = mapItemsFactory(SegmentPolylines, {
//   isPolyline: true,
//   hasDataObservable: false
// });

// export const SegmentPolylinesTrace = _.compose(
//   PolylinesMixin,
//   MarkersMixin,
//   StyleMixin,
//   TraceMixin,
// )(SegmentPolylines);
