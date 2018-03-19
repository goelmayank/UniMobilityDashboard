import { HtPosition } from "ht-models";
import {Observable} from "rxjs/Observable";
import {Polyline, Map, LatLng, CircleMarker, Circle, Marker, DivIcon} from "leaflet";

export interface MapUtils {
  type: HtMapType;
  setMap: (item: HtMapItem, map: HtMap) => void;
  setKey: (key: string) => boolean;
  setDefaultMapOptions: (options: object) => void;
  defaultMapOptions: object;
  setStyle: (item: HtMapItem, style) => void;
  setCircleStyle: (item: HtMapItem, style) => void;
  setPolylineStyle: (polyline, style) => void;
  clearItem: (item: HtMapItem) => void;
  extendItemBounds: (
    item?: HtMapItem,
    bounds?: HtBounds,
    force?: boolean
  ) => HtBounds;
  extendBounds: (latLng: HtPosition, bounds: HtBounds) => HtBounds;
  extendBoundsWithPolyline: (item?: HtPolyline, bounds?: HtBounds) => HtBounds;
  getLatlng: (position: HtPosition) => HtLatLng;
  updatePosition: (
    marker: HtMarker,
    position: HtPosition,
    content?: string,
    options?
  ) => void;
  openTooltip: (item: HtMapItem, content?: string) => void;
  closeTooltip: (item: HtMapItem) => void;
  openPopup: (item: HtMapItem | {}, map, content?: string, popup?) => void;
  openPopupPosition: (position: HtPosition, map, content, popup) => void;
  closePopup: (item: HtMapItem) => void;
  bringToFront: (item: HtMapItem) => void;
  setFocus: (item: HtMapItem, map: HtMap, config?: SetFocusConfig) => void;
  renderMap: (elem: HTMLElement | string, options: object) => HtMap;
  updateCirclePosition?: (
    item,
    position,
    info?: string,
    options?: object
  ) => any;
  getCircleMarker: () => any;
  getMarker: () => any;
  getMarkerCluster: (map: HtMap) => any;
  addMarkersToCluster: (cluster, markers: HtMarker[], map?) => any;
  removeClusterMarkers: (cluster) => any;
  removeClusterMarker: (cluster, marker) => any;
  getPopup: (options?) => any;
  getPolyline: () => any;
  setEncodedPath: (item, path: string) => void;
  setBounds: (map: HtMap, bounds: HtBounds, options?) => void;
  isValidBounds: (bounds: HtBounds) => boolean;
  invalidateSize: (map) => void;
  onEvent$: (item, event) => Observable<any>;
  onEvent: (item, event, cb) => void;
  removeEvent: (item, event, cb) => void;
  setDivContent: (item, content: string, options?: object) => void;
  getDivMarker: () => any;
  setDivMarkerStyle: (marker, options: object) => any;
  setPathPositionTimeArray: (polyline, positionTimeArray) => any;
  getHeatmap: (options?) => any,
  setPath(polyline, path: HtPosition[]) : any;
  getItemPosition(item): HtPosition | null;
  updateHeatMapLatlng: (latlngs: HtPosition[], heatmap) => void;
  getElement(item): HTMLElement | null;
}

export interface SetFocusConfig {
  zoom?: number;
  force?: boolean;
  center?: boolean;
}

export type HtMap = Map | google.maps.Map;
export type HtBounds = any;
export type HtPolyline = Polyline | google.maps.Polyline;
export type HtLatLng = LatLng | google.maps.LatLng;
export type HtMarker =
  | CircleMarker
  | Circle
  | Marker
  | DivIcon
  | google.maps.Marker
  | google.maps.Circle;
export type HtMapItem = HtMarker | HtPolyline;
export type HtMapType = "google" | "leaflet";
