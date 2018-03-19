import { IAction, IActionMap, IActionHeat, HtPosition } from "ht-models";
import _ from "underscore";
import { IActionPositions } from "../interfaces";
import { GetDateRangeQuery } from "ht-utility";
import {addSeconds} from "date-fns";

export class HtAction {
  types = ["delivery", "pickup", "task", "visit", "stopover", "trip"];

  sortingQueryMap: object = {
    assigned_at: "Assigned",
    completed_at: "Completed",
    type: "Type",
    user__name: "User name",
    status: "Status"
  };

  ontimeFilters = [
    { event_flags: "action.delayed" },
    { event_flags: "action.completed_late" }
  ];

  statusQueryMap = {
    created: "Not yet started",
    "assigned,started": "Assigned",
    "started,assigned": "Assigned",
    completed: "Completed"
  };

  ontimeQueryMap = {
    "action.delayed": "Running delayed",
    "action.completed_late": "Completed late"
  };

  markerFilterMap = {
    "assigned,started": (action: IAction) => {
      return action.status == "assigned" || action.status == "started";
    },
    "started,assigned": (action: IAction) => {
      return action.status == "assigned" || action.status == "started";
    },
    completed: (action: IAction) => {
      return action.status == "completed";
    },
    created: (action: IAction) => {
      return action.status == "created";
    }
  };

  constructor(public data?: IAction) {}

  get filterQueryMap() {
    return { ...this.statusQueryMap, ...this.ontimeQueryMap };
  }

  get sortings(): string[] {
    return Object.keys(this.sortingQueryMap);
  }

  getStatusString(status: string) {
    return this.statusQueryMap[status] || status;
  }

  getOntimeString(value: string) {
    return this.ontimeQueryMap[value] || value;
  }

  getFilterString(value: string) {
    return this.filterQueryMap[value] || value;
  }

  getSortingString(value: string) {
    return this.sortingQueryMap[value] || value;
  }

  getMarkerFilter(key: string) {
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

  getMarkerSeached(key: string) {
    return (action: IAction) => {
      return (
        (action.lookup_id && action.lookup_id.indexOf(key) > -1) ||
        (action.user && action.user.name.indexOf(key) > -1)
      );
    };
  }

  isAwayFromExpected() {
    let action = this.data;
    if (action.expected_place && action.event_flags) {
      let flag = _.find(action.event_flags, flag => {
        return (
          flag["type"] == "action.completed_at_different_place_than_expected"
        );
      });
      return !!flag;
    }
    return false;
  }

  isValidMarker(action?: IActionMap | IAction) {
    action = action || this.data;
    return !!(
      (action.expected_place && action.expected_place.location) ||
      (action.completed_place && action.completed_place.location)
    );
  }

  getDateRangeQuery(query) {
    return GetDateRangeQuery(query, "created_at");
  }

  getPositionsObject(): IActionPositions | null {
    let completedPosition = this.getCompletedPosition();
    let expectedPosition = this.getExpectedPosition();
    let isAwayFromExpected = this.isAwayFromExpected();
    return {
      completedPosition,
      expectedPosition,
      isAwayFromExpected,
      hasEnded: this.hasEnded(),
      position: completedPosition || expectedPosition
    };
  }

  getCompletedPosition(): HtPosition | null {
    let action = this.data;
    if (action && action.completed_place && action.completed_place.location) {
      let compLoc = action.completed_place.location.coordinates;
      let lat = compLoc[1];
      let lng = compLoc[0];
      return { lat, lng };
      // return [compLoc[1], compLoc[0]]
    }
    return null;
  }

  getExpectedPosition(): HtPosition | null {
    let action = this.data;
    if (action && action.expected_place && action.expected_place.location) {
      let expLoc = action.expected_place.location.coordinates;
      let lat = expLoc[1];
      let lng = expLoc[0];
      return { lat, lng };
      // return [expLoc[1], expLoc[0]]
    }
    return null;
  }

  getPosition(): HtPosition | null {
    return this.getPositionsObject().position;
  }

  hasEnded(): boolean {
    return !!this.data.display.ended_at;
  }

  getETATimestamp() {
    let action = this.data;
    if (action.display.duration_remaining) {
      return addSeconds(new Date(), action.display.duration_remaining).toISOString()
    }
    return null;
  }

  getHeatmapLatlng(item: IActionHeat): HtPosition {
    return {
      lat: item.completed_place__location[1],
      lng: item.completed_place__location[0],
    }
  }

  getHeatLatlngs(items: IActionHeat[]) {
    return _.reduce(items, (acc: any[], place: IActionHeat) => {
      let placeLatlng = [place.completed_place__location[1], place.completed_place__location[0]];
      let placeArray = Array(place.num_actions).fill(placeLatlng);
      return [...acc, ...placeArray]
    }, []);
  }
}

export const htAction = (action?: IAction) => new HtAction(action);
