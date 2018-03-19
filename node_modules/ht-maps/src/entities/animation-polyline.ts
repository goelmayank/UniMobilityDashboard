import {SegmentPolylines} from "./segment-polylines";
import {MarkersMixin} from "../mixins/marker-renderer";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {TraceMixin} from "../mixins/trace";
import {StyleMixin} from "../mixins/styles";
import {AnimationMixin} from "../mixins/animation-renderer";
import {SingleItemMixin} from "../mixins/single-item";
import {MapInstance} from "../map-utils/map-instance";
import {Entity, StyleFunct} from "../interfaces";
import {HtPosition} from "ht-models";
import {TimeAwareAnimation} from "time-aware-polyline";
import {IPathBearingTime} from "ht-models";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";
import {HtBounds} from "ht-map-wrapper";

export class AnimPolyline extends SegmentPolylines {
  mapInstance: MapInstance;
  animation: TimeAwareAnimation;
  name = "anim polyline";
}

export const AnimPolylineTrace = AnimationMixin(SingleItemMixin(
  TraceMixin(ExtendBoundsMixin(
    PolylinesMixin(MarkersMixin(StyleMixin(
      MapItemsMixin(AnimPolyline)
    )))))
))
