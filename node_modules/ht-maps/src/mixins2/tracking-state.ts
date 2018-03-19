import { Observable } from "rxjs/Observable"
import { map } from "rxjs/operators";
import { HtPosition } from "ht-models";

export class TrackingState {
  data$: Observable<any[]>;
  mapData$: Observable<{}>;
  isValidMapItems: (data) => boolean;
  
  setMapData() {
    this.mapData$ = this.data$.pipe(
      map((data: any[]) => {
        return getMarkersArray(data);
      })
    )
  }
}

export function getMarkersArray(array: any[], isNew: boolean = false) {
  return array.reduce(
    (acc, item) => {
      const isValid = this.isValidMapItems
        ? this.isValidMapItems(item)
        : false;
      if (isValid) {
        acc.valid.push(item);
      } else {
        acc.invalid.push(item);
      }
      return acc;
    },
    { valid: [], invalid: [], isNew }
  );
}