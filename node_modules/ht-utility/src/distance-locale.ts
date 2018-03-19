import {getTimezone} from "./timezone";

export function DistanceLocale(meters, timezone = "_") {
  timezone = timezone || getTimezone();
  if (meters != undefined && typeof meters == "number" && meters >= 0) {
    let america: boolean = timezone.indexOf("America") > -1;
    // console.log(config.timezone.indexOf('America'), america, config.timezone);
    // let test = false;
    if (america) {
      let miles = Math.round(meters * 0.00621371) / 10;
      let milesLocaleString = miles.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
      return milesLocaleString + " miles";
    } else {
      let km = Math.round(meters / 100) / 10;
      let kmLocaleString = km.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
      return kmLocaleString + " km";
    }
  } else {
    return "-";
  }
}
