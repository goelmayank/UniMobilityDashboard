// import { IPathSegment, ITimeAwarePoint } from "ht-models";
//
// export class TimeAwarePolyline {
//   timeAwareArray: ITimeAwarePoint[];
//
//   constructor() {}
//
//   decode(encodedPolyline): ITimeAwarePoint[] {
//     return Polyline.decodeTimeAwarePolyline(encodedPolyline);
//   }
//
//   getPolylineSegmentsForLocationsElapsed(
//     timeAwarePolyline: ITimeAwarePoint[],
//     time: string
//   ): IPathSegment[] {
//     return Polyline.getPolylineSegmentsForLocationsElapsed(
//       timeAwarePolyline,
//       time
//     );
//   }
//
//   getPolylineSegmentForLocationsElapsed(
//     timeAwarePolyline: ITimeAwarePoint[],
//     time: string
//   ): IPathSegment[] {
//     return Polyline.getLocationsTillTimeStamp(timeAwarePolyline, time);
//   }
//
//   getLocationsAtTimes(timeAwarePolyline: ITimeAwarePoint[], times: string[]) {
//     return Polyline.getLocationsAtTimestamps(timeAwarePolyline, times);
//   }
// }
