import { IPathSegment, ITimeAwarePoint } from "ht-models";
import { TimeAwareEncoder} from "time-aware-polyline";

export const positionTime = {
  positionTimePoints: [],
  decode(encodedPolyline): ITimeAwarePoint[] {
    this.positionTimePoints = new TimeAwareEncoder().decodeTimeAwarePolyline(encodedPolyline);
    return this.positionTimePoints;
  }
};
