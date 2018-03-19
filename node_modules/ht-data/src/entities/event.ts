import { IEvent, ITimelineEvent } from "ht-models";
import { IEventDisplay } from "../interfaces";

export class HtEvent {
  constructor(public data?: IEvent) {}

  getEventDisplay(event?: IEvent | ITimelineEvent): IEventDisplay {
    event = event || this.data;
    switch (event.type) {
      case "tracking.started":
        return {
          text: "Tracking started",
          subText: ""
        };
      case "tracking.ended":
        return {
          text: "Tracking ended",
          subText: ""
        };
      // case 'device.location.disabled':
      //   return {
      //     text: 'Location disabled',
      //     subtext: ''
      //   };
      // case 'device.location.enabled':
      //   return {
      //     text: 'Location enabled',
      //     subtext: ''
      //   };
      // case 'device.location_permission.disabled':
      //   return {
      //     text: 'Location permission disabled',
      //     subtext: ''
      //   };
      // case 'device.location_permission.enabled':
      //   return {
      //     text: 'Location permission enabled',
      //     subtext: ''
      //   };
      case "device.secondary.ignored":
        return {
          text: "Secondary device ignored",
          subText: ""
        };
    }
  }
}

export const htEvent = (event?: IEvent) => new HtEvent(event);
