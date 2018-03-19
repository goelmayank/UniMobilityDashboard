import { Color } from "ht-utility";

export const segmentPolylineStyles = {
  get(type) {
    switch (type) {
      case "google": {
        return {
          default: {
            strokeColor: Color.blue,
            strokeOpacity: 1,
            strokeWeight: 5
          },
          highlight: {
            strokeColor: Color.blue,
            strokeOpacity: 1,
            strokeWeight: 5
          },
          fade: {
            strokeColor: Color.grey5,
            strokeOpacity: 0.2,
            strokeWeight: 2
          }
        }
      };
      case "leaflet": {
        return {
          default: {
            weight: 5,
            color: Color.blue,
            opacity: 1
          },
          highlight: {
            weight: 5,
            color: Color.blue,
            opacity: 1
          },
          fade: {
            weight: 2,
            color: Color.grey2,
            opacity: 0.2
          }
        }
      }
    }
  },
};
