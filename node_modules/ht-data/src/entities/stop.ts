import { ISegment } from "ht-models";

export class HtStop {
  constructor(public data?: ISegment) {}

  getPosition() {
    let pos = null;
    if (this.data.location && this.data.location.geojson.coordinates) {
      pos = this.data.location.geojson.coordinates;
      return { lat: pos[1], lng: pos[0] };
    } else {
      return null;
    }
  }
}

export const htStop = (action?: ISegment) => new HtStop(action);
