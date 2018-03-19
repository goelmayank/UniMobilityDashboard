import { TimeAwareEncoder } from "./time-aware";

export class PolylineUtils {
  encodedPolyline: string;
  timeAwarePolyline: Array<Array<any>>;
  encoder = new TimeAwareEncoder();
  constructor() {

  }

  updateTimeAwarePolyline(encodedPolyline) {
    if(this.isNewPolyline(encodedPolyline)) {
      this.encodedPolyline = encodedPolyline;
      this.timeAwarePolyline = this.encoder.decodeTimeAwarePolyline(this.encodedPolyline);
    }
  }

  getPolylineToTime(timestamp: string) {
    return this.encoder.getLocationsElapsedByTimestamp(this.timeAwarePolyline, timestamp)
  }

  getLatestTime(): string | null {
    if(this.timeAwarePolyline) {
      let lastI = this.timeAwarePolyline.length - 1;
      return lastI > -1 ? this.timeAwarePolyline[lastI][2] : null
    } else {
      return null;
    }
  }

  isNewPolyline(encodedPolyline): boolean {
    return encodedPolyline != this.encodedPolyline;
  }
}