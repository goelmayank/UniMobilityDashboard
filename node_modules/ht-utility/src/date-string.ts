import {format, isValid} from "date-fns";

export function DateString(item: string, args?): string {
  if (typeof item == "string" && item.length > 4 && isValid(new Date(item))) {
    let formatString = args == "short" ? "MMM D" : "MMM D, YYYY";
    return format(new Date(item), formatString);
  } else {
    return item;
  }
}
