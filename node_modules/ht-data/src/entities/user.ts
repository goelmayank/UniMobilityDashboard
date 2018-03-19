import {
  ISegment,
  IUser,
  IUserAnalytics,
  IUserData,
  HtLocation,
  IAction,
  ITimelineEvent,
  HtPosition
} from "ht-models";
import { ISegmentType } from "../interfaces";
import _ from "underscore";

export class HtUser {
  statusQueryMap = {
    stopped: "Stopped",
    on_trip: "Moving",
    logged_off: "Logged off",
    "location_disabled,network_offline": "Error",
    location_disabled: "Location disabled",
    network_offline: "Network offline",
    never_tracked: "Never tracked"
  };

  sortingQueryMap = {
    num_trips: "Trips",
    name: "Name",
    status: "Status",
    num_places: "Places",
    total_distance: "Distance",
    total_duration: "Duration",
    stop_duration: "Stop duration",
    location_disabled_duration: "Location disabled",
    network_offline_duration: "Network offline",
    num_actions: "Actions",
    last_heartbeat_at: "Last updated"
  };

  markerFilterMap = {
    stopped: (user: IUserAnalytics) => {
      return user.status == "stopped";
    },
    on_trip: (user: IUserAnalytics) => {
      return (
        user.status == "walk" ||
        user.status == "run" ||
        user.status == "cycle" ||
        user.status == "drive" ||
        user.status == "moving"
      );
      //moving: walk, drive, cycle, run
    },
    logged_off: (user: IUserAnalytics) => {
      return user.status == "logged_off";
    },
    location_disabled: (user: IUserAnalytics) => {
      return user.status == "location_disabled";
    },
    network_offline: (user: IUserAnalytics) => {
      return user.status == "network_offline";
    }
  };

  constructor(public data?: IUserData | IUser | IUserAnalytics) {}

  getMarkerSearched(key: string) {
    return (user: IUserAnalytics) => {
      if (!user.name) return false;
      let name = user.name.toLowerCase();
      key = key.toLowerCase();
      return name.includes(key);
    };
  }

  getMarkerFilter(key?: string) {
    let filter = this.markerFilterMap[key];
    if (key) {
      if (filter) {
        return filter;
      } else {
        return () => false;
      }
    } else {
      return () => true;
    }
  }

  get sortings(): string[] {
    return Object.keys(this.sortingQueryMap);
  }

  getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(
      userSegments,
      (segmentType: ISegmentType, segment: ISegment) => {
        if (segment.type == "stop") {
          if (segment.location && segment.location.geojson)
            segmentType.stopSegment.push(segment);
        } else {
          if (segment.encoded_polyline) segmentType.tripSegment.push(segment);
        }
        return segmentType;
      },
      { tripSegment: [], stopSegment: [] }
    );
  }

  getPosition(): HtPosition | null {
    let data = this.data;
    if (data.last_location && data.last_location.geojson) {
      const lat = data.last_location.geojson.coordinates[1];
      const lng = data.last_location.geojson.coordinates[0];
      return { lat, lng };
      // return L.latLng([item.last_location.geojson.coordinates[1], item.last_location.geojson.coordinates[0]])
    } else {
      return null;
    }
  }

  isValidMarker(user?: IUserAnalytics | IUser) {
    user = user || this.data;
    return !!(user.last_location && user.last_location.geojson);
  }
}

export const htUser = (user?: IUser | IUserData | IUserAnalytics) => {
  let extras = {
    statusQueryMap: {
      stopped: "Stopped",
      on_trip: "Moving",
      logged_off: "Logged off",
      "location_disabled,network_offline": "Error",
      location_disabled: "Location disabled",
      network_offline: "Network offline",
      never_tracked: "Never tracked"
    },
    sortingQueryMap: {
      num_trips: "Trips",
      name: "Name",
      status: "Status",
      num_places: "Places",
      total_distance: "Distance",
      total_duration: "Duration",
      stop_duration: "Stop duration",
      location_disabled_duration: "Location disabled",
      network_offline_duration: "Network offline",
      num_actions: "Actions",
      last_heartbeat_at: "Last updated"
    },
    markerFilterMap: {
      stopped: (user: IUserAnalytics) => {
        return user.status == "stopped";
      },
      on_trip: (user: IUserAnalytics) => {
        return (
          user.status == "walk" ||
          user.status == "run" ||
          user.status == "cycle" ||
          user.status == "drive" ||
          user.status == "moving"
        );
        //moving: walk, drive, cycle, run
      },
      logged_off: (user: IUserAnalytics) => {
        return user.status == "logged_off";
      },
      location_disabled: (user: IUserAnalytics) => {
        return user.status == "location_disabled";
      },
      network_offline: (user: IUserAnalytics) => {
        return user.status == "network_offline";
      }
    },
    getMarkerSearched(key: string) {
      return (user: IUserAnalytics) => {
        if (!user.name) return false;
        let name = user.name.toLowerCase();
        key = key.toLowerCase();
        return name.includes(key);
      };
    },
    getMarkerFilter(key?: string) {
      let filter = this.markerFilterMap[key];
      if (key) {
        if (filter) {
          return filter;
        } else {
          return () => false;
        }
      } else {
        return () => true;
      }
    }
  };

  return {
    data: user,
    isValidMarker() {
      let user = this.data;
      return !!(user.last_location && user.last_location.geojson);
    },
    getPosition(): HtPosition | null {
      if (this.isValidMarker()) {
        return this.getValidPosition();
      } else {
        return null;
      }
    },
    getValidPosition(): HtPosition {
      let data = this.data;
      const lat = data.last_location.geojson.coordinates[1];
      const lng = data.last_location.geojson.coordinates[0];
      return { lat, lng };
    },
    // update(user) {
    //   return {...this, ...user}
    // },
    getInfoContent() {
      let user = this;
      return user.name;
    },
    ...extras
  };
};
