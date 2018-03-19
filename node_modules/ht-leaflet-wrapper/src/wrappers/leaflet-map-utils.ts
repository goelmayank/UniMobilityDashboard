import {HtBounds, HtMapType, HtMarker, MapUtils, SetFocusConfig} from "ht-map-wrapper";
import {PolylineUtil} from "./encoded-polyline";
import { HtPosition } from "ht-models";
import {
  circleMarker,
  divIcon,
  latLng,
  latLngBounds,
  map,
  marker,
  point,
  polyline,
  popup,
  tileLayer,
  Map,
  LatLng,
  LatLngBounds, Popup
} from "leaflet";
import { markerCluster } from "./leaflet.markercluster";
import {LineString, MultiLineString} from "geojson";
import * as L from "leaflet";
import {leafletHeat} from "./leaflet.heatmap";
import {fromEventPattern} from "rxjs/observable/fromEventPattern";
import {Observable} from "rxjs/Observable";

export class LeafletMapUtilsClass implements MapUtils {
  type: HtMapType = 'leaflet';
  defaultMapOptions = {
    center: [3.505, 0],
    zoom: 2 ,
    tileLayerUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    tileLayerOptions: {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  };

  setDefaultMapOptions(options) {
    this.defaultMapOptions = {...this.defaultMapOptions, ...options}
  }
  renderMap(elem: HTMLElement | string, options) {
    options = {...options, ...this.defaultMapOptions};
    let newmap = map(elem, options);
    if ( options.tileLayerUrl) {
      tileLayer(options.tileLayerUrl, options.tileLayerOptions || {}).addTo(newmap);
    }

    return newmap;
  }

  setMap(item, map: Map) {
    if (((item && !item.getElement) || (item && !item.getElement())) && map.getContainer().offsetWidth) {
      item.addTo(map);
    }
  };

  setKey(key) {
    return true;
  }

  setStyle(item, style) {
    if (item.setStyle) item.setStyle(style);
  };

  setCircleStyle (item, style) {
    this.setStyle(item, style)
  };

  setPolylineStyle (polyline, style) {
    polyline.setStyle(style);
  };

  clearItem (item) {
    item.remove();
    item.off();
  };

  extendItemBounds(
    item = null,
    bounds: LatLngBounds = latLngBounds([]),
    force: boolean = false
  ): LatLngBounds {
    if (force || (item && !item.getElement) || (item && item.getElement())) bounds.extend(item.getLatLng());
    return bounds;
  }

  extendBounds(position: HtPosition, bounds: LatLngBounds = latLngBounds([])): HtBounds {
    let latlng = this.getLatlng(position);
    bounds.extend(latlng);
    return bounds
  }

  extendBoundsWithPolyline (
    polyline = null,
    bounds: LatLngBounds = latLngBounds([])
  ): LatLngBounds {
    if (polyline && polyline.getElement()) {
      bounds.extend(polyline.getBounds());
    }
    return bounds;
  };

  getLatlng ({ lat, lng }: HtPosition = { lat: 0, lng: 0 }) {
    return latLng(lat, lng);
  };

  updatePosition(
    marker,
    position: HtPosition,
    infoContent: string = "",
    defaultOption: L.TooltipOptions = {}
  ) {
    let latLng = this.getLatlng(position);
    marker.setLatLng(latLng);
    if (infoContent) this.updateTooltip(marker, infoContent, defaultOption);
  }

  updateTooltip(marker, infoContent, defaultOption) {
    if (marker.getTooltip()) {
      marker.setTooltipContent(infoContent);
    } else {
      marker.bindTooltip(infoContent, defaultOption);
    }
  }

  openTooltip(item: L.Marker, content?: string) {
    if (content) item.setTooltipContent(content);
    item.openTooltip();
  }

  closeTooltip(item) {
    item.closeTooltip();
  }

  openPopup(item, map, content?: string) {
    if (content) item.setPopupContent(content);
    item.openPopup();
  }

  closePopup(item) {
    item.closePopup();
  }

  bringToFront(item) {
    item.bringToFront();
  }

  setFocus(item, map: L.Map, config: SetFocusConfig) {
    if ((item && item.getElement()) || config.force) {
      let markerCenter = this.getItemLatlng(item);
      if (config.center) map.panTo(markerCenter, { animate: true, duration: 1 });
      if (config.zoom && config.center) map.setView(markerCenter, config.zoom);
    }
  }

  getItemLatlng(item) {
    return item.getLatLng();
  }

  updateCirclePosition(
    circle,
    position,
    infoContent: string = "",
    defaultOption: L.TooltipOptions = {}
  ) {
    this.updatePosition(circle, position, infoContent, defaultOption);
  }

  getCircleMarker() {
    return circleMarker([0, 0]);
  }

  getMarker() {
    return marker([0, 0]);
  }

  getMarkerCluster(map): L.MarkerClusterGroup {
    let cluster = markerCluster();
    map.addLayer(cluster);
    return cluster;
  }

  removeClusterMarkers(cluster) {
    cluster.clearLayers();
  }

  removeClusterMarker(cluster, marker) {
    cluster.removeLayer(marker);
  }

  addMarkersToCluster(cluster, markers) {
    let marker = markers[0];
    cluster.addLayers(markers);
    cluster.refreshClusters(markers);
  }

  getPolyline() {
    return polyline([]);
  }

  setBounds(map: L.Map, bounds: L.LatLngBounds, options?) {
    if(map && map.getContainer() && map.getContainer().offsetWidth) {
      if(options.toFly) {
        map.flyToBounds(bounds, options);
      } else {
        map.fitBounds(bounds, options)
      }
    }
  }

  isValidBounds(bounds: L.LatLngBounds) {
    return bounds.isValid();
  }

  invalidateSize(map: L.Map) {
    if(map && map.getContainer().offsetWidth) {
      map.invalidateSize();
    }
  }

  getPopup(options): Popup {
    return popup(options);
  }

  onEvent$(item, type: string): Observable<any> {
    return fromEventPattern(this.mapEventHandler(item, type), this.removeHandler(item, type))
  }

  private mapEventHandler(item, type) {
    return (handler) => this.onEvent(item, type, handler)
  }

  private removeHandler(item, type) {
    return (handler) => this.removeEvent(item, type, handler)
  }

  onEvent(item, event, cb) {
    item.on(event, e => {
      cb(e);
    });
  }

  removeEvent(item, event, cb?) {
    item.off(event, e => {
      cb(e)
    })
  }

  openPopupPosition(position, map, content, popup) {
    popup
      .setLatLng(position)
      .setContent(content)
      .openOn(map);
  }

  setDivContent(marker, content, options = {}) {
    let currentContent = marker.options.icon ? marker.options.icon.options.html : "";
    if (content != currentContent) {
      this.setDivMarkerStyle(marker, { html: content, ...options });
      options['zIndexOffset'] && marker.setZIndexOffset(options['zIndexOffset']);
    }
    // console.error('set div content not implemented')
  }

  getDivMarker() {
    return this.getMarker();
  }

  setDivMarkerStyle(item, options: any = {}) {
    let icon = divIcon(options);
    this.setIcons(item, icon);
  }

  setIcons(marker, icon) {
    marker.setIcon(icon);
  }

  getHeatmap(options = {}): L.HeatLayer {
    return leafletHeat([], options)
  }

  updateHeatMapLatlng(latlngs: HtPosition[], heatmap) {
    let latlngArray = latlngs.map((pos: HtPosition) => ([pos.lat, pos.lng, pos.weight || 1]));
    heatmap.setLatLngs(latlngArray)
  }

  setEncodedPath (polyline, encodedPolyline: string) {
    var path = PolylineUtil.decode(encodedPolyline);
    return polyline.setLatLngs(path);
  };

  setPath(polyline: L.Polyline, path: HtPosition[]) {
    path = path.map(pos => {
      return this.getLatlng(pos)
    })  ;
    polyline.setLatLngs(path)
  };

  setPathPositionTimeArray (polyline, positionTimeArray) {
    return polyline.setLatLngs(positionTimeArray);
  };


  getItemPosition(item: L.Marker) {
    let position = item.getLatLng();
    return position ? {lat: position.lat, lng: position.lng} : null;
  }

  getElement(item) {
    return item ? item.getElement() : null
  }

}