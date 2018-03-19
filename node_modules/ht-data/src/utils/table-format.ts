import {DistanceLocale, TimeString, DateString, HMString, NameCase, DotString} from "ht-utility";
import {IUserAnalytics, IAction, IUser} from "ht-models";

export const tableFormat = (data: object, config: ITableFormatConfig) => {
  const format = config.format;
  return Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    if (typeof value === 'number' || typeof value === 'string' && !!!config.excludes.includes(key)) {
      const formatKey = format[key];
      if (formatKey) {
        const label = formatKey.label || key;
        const formattedValue = formatKey.selector(data) || value;
        acc.push([label, formattedValue]);
      } else {
        const label = key;
        const formattedValue = value;
        acc.push([label, formattedValue]);
      }

      return acc
    } else {
      return acc
    }
  }, [])
};

export const actionTableFormat = {
  "assigned_at": {
    label: "Assigned at",
    selector(action: IAction) {
      return dateTimeString(action.assigned_at)
    }
  },
  "expected_at": {
    label: "Expected at",
    selector(action: IAction) {
      return action.expected_at ? dateTimeString(action.expected_at) : "--"
    }
  },
  "completed_at": {
    label: "Completed at",
    selector(action: IAction) {
      return dateTimeString(action.completed_at)
    }
  },
  "distance": {
    label: "Distance",
    selector(action: IAction) {
      return action.distance || action.distance == 0 ? DistanceLocale(action.distance) : "--";
    }
  },
  "duration": {
    label: "Duration",
    selector(action: IAction) {
      return action.duration || action.duration == 0 ? HMString(action.duration, 60) : "--";
    }
  },
  "scheduled_at": {
    label: "Scheduled at",
    selector(action: IAction) {
      return dateTimeString(action['scheduled_at'])
    }
  },
  "distance&duration": {
    label: "Distance/Duration",
    selector(action: IAction) {
      return `${actionTableFormat.distance.selector(action)}/${actionTableFormat.duration.selector(action)}`
    }
  },
  "type": {
    label: "Type",
    selector(action: IAction) {
      return NameCase(DotString(action.type))
    }
  }
};

export const userTableFormat = {
  "stop_duration": {
    label: "Stop Duration",
    selector(user: IUserAnalytics) {
      return HMString(user.stop_duration, 60)
    }
  },
  "last_heartbeat_at": {
    label: "Last updated at",
    selector(user: IUserAnalytics) {
      return dateTimeString(user.last_heartbeat_at)
    }
  },
  "last_battery": {
    label: "Last battery",
    selector(user: IUser) {
      return user.display.battery + " %"
    }
  },
  "total_duration": {
    label: "Duration tracked",
    selector(user: IUserAnalytics) {
      return HMString(user.total_duration, 60)
    }
  },
  "num_places" : {
    label: "Number of stops",
    selector(user: IUserAnalytics) {
      return user.num_places
    }
  },
  "location_disabled_duration": {
    label: "Location disabled duration",
    selector(user: IUserAnalytics) {
      return HMString(user.location_disabled_duration, 60)
    }
  },
  "total_distance": {
    label: "Total distance",
    selector(user: IUserAnalytics) {
      return DistanceLocale(user.total_distance)
    }
  },
  "num_trips": {
    label: "Number of trips",
    selector(user: IUserAnalytics) {
      return user.num_trips
    }
  },
  "network_offline_duration": {
    label: "Network offline duration",
    selector(user: IUserAnalytics) {
      return HMString(user.network_offline_duration, 60)
    }
  },
  "num_actions": {
    label: "Number of actions",
    selector(user: IUserAnalytics) {
      return user.num_actions
    }
  }
};

export interface ITableFormatConfig {
  excludes?: string[],
  format: { [key: string]: ITableFormat}
}

export interface ITableFormat {
  label: string,
  selector: (data) => string | number
}

function dateTimeString(time) {
  return time ?`${TimeString(time)}, ${DateString(time, 'short')}` : "--"
}