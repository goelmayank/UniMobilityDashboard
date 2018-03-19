import {BaseFilter} from "./base-filter";
import {QueryLabel} from "../interfaces";
import {Color} from "ht-utility";

export class ActionsFilter extends BaseFilter {
  customQueryArray: QueryLabel[] = [];
  statusQueryArray: QueryLabel[] = [
    {
      label: "Not yet started",
      values: ["created"],
      color: "#8a91a0"
    },
    {
      label: "Assigned",
      values: ["assigned", "started"],
      color: Color.blue
    },
    {
      label: "Completed",
      values: ["completed"],
      color: Color.stop

    },
    {
      label: "Suspended",
      values: ["suspended"],
      color: Color.red
    }
  ];

  sortingQueryMap = {
    assigned_at: "Assigned",
    completed_at: "Completed",
    distance: "Distance",
    duration: "Duration",
    type: "Type",
    user__name: "User name",
    status: "Status"
  };

  genericQueryArray: QueryLabel[] = [];

  get allQueryArray() {
    return [
      ...this.statusQueryArray,
      ...this.genericQueryArray,
      ...this.customQueryArray
    ];
  }
}