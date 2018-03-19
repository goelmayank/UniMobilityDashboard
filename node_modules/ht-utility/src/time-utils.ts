import {addMilliseconds, isSameMinute, subDays} from "date-fns";

// export function DayAgoISO() {
//   return subDays(new Date(), 1).toISOString();
// }

export function OffsetIsoTime(time: string, offset: number = 10) {
  return addMilliseconds(time, offset).toISOString()
}

export function GetMinute(time: string) {
  let timeStamp = new Date(time).getTime();
  return Math.round(timeStamp - timeStamp % 60000);
}

export function HasSameMinute(time1: string, time2: string) {
  return isSameMinute(time1, time2)
}

export function humanizeDuration(second, scale) {
  if (second) {
    let min = second / (scale * 60);
    let minutes = min % 60;
    let hours = (min - minutes) / 60;
    let minuteCeiling = Math.ceil(minutes);
    let duration = minuteCeiling + " min";
    if (min >= 60 && hours <= 24) {
      duration = Math.floor(minutes) + " min";
      duration = hours + " hr " + duration;
    } else if (hours > 24) {
      let day = Math.floor(hours / 24);
      let hour = Math.floor(hours % 24);
      duration = day + " d";
      if (hour > 0 && day < 3) {
        duration = duration + " " + hour + " hr";
      }
    }
    return duration;
  } else if (second == 0) {
    return "1 min";
  } else {
    return "";
  }
}
