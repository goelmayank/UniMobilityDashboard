import * as jstz from "jstz";

export function getTimezone () {
    return jstz.determine().name();
}