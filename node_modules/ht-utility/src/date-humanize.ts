import {isToday, isTomorrow, isValid, isYesterday, format} from "date-fns";

export function DateHumanize(value: string, arg: boolean = false): string {
  if (typeof value == "string" && value.length > 4 && isValid(new Date(value))) {
    const date = new Date(value);
    if ( isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "D MMM")
    }
  } else {
    return value;
  }
}
