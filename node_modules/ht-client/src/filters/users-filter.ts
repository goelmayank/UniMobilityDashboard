import { BaseFilter } from "./base-filter";
import { Color } from "ht-utility";
import { QueryLabel } from "../interfaces";

export class DefaultUsersFilter extends BaseFilter {
  customQueryArray: QueryLabel[] = [];

  statusQueryArray: QueryLabel[] = [
    {
      label: "Stopped",
      values: ["stopped"],
      color: Color.stop
    },
    {
      label: "Moving",
      values: ["on_trip"],
      color: Color.blue
    },
    {
      label: "Logged off",
      values: ["logged_off"],
      color: "#8a91a0"
    },
    {
      label: "Location disabled",
      values: ["location_disabled"],
      color: Color.red
    },
    {
      label: "Network offline",
      values: ["network_offline"],
      color: "#ccc"
    }
  ];

  activityQueryArray: QueryLabel[] = [
    {
      label: "Logged in",
      values: ["stopped", "on_trip", "network_offline"],
      color: Color.blue
    },
    {
      label: "Logged off",
      values: ["logged_off"],
      color: "#a8a8a8"
    },
    {
      label: "Location disabled",
      values: ["location_disabled"],
      color: Color.red
    }
  ];

  genericQueryArray: QueryLabel[] = [
    {
      label: "Show all",
      values: ["show_all"]
    }
  ];

  showAllQueryArray: QueryLabel[] = [
    {
      label: "Never tracked",
      values: ["never_tracked"],
      color: "#575757"
    }
  ];

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

  get allQueryArray() {
    return [
      ...this.statusQueryArray,
      ...this.genericQueryArray,
      ...this.showAllQueryArray,
      ...this.customQueryArray
    ];
  }

  getStatusQueryArray(showAll: boolean = false) {
    return showAll
      ? [...this.statusQueryArray, ...this.showAllQueryArray]
      : this.statusQueryArray;
  }

  mapQueries = [];

  statusOverviewQueries = ["search", "show_all"];
}
