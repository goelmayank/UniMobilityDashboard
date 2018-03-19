import * as L from "leaflet";
import "leaflet.markercluster";

export const markerCluster = (): L.MarkerClusterGroup => {
  // console.log(L.MarkerClusterGroup);
  return L.markerClusterGroup();
};
