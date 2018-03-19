import {HtBounds, HtMapType, HtMarker, MapUtils} from "ht-map-wrapper";
import * as _ from "underscore";
import { ITimeAwarePoint, HtPosition } from "ht-models";
import {LightColorMapStyle} from "./light-color-map";
import {fromEventPattern} from "rxjs/observable/fromEventPattern";
import {Observable} from "rxjs/Observable";
// import {richmarker} from "./richmarker";
// import {markercluster} from "./markerclusterer";
declare var MarkerClusterer: any;
declare var RichMarker: any;

export class GoogleMapUtilsClass implements MapUtils {
  type: HtMapType = 'google';
  defaultMapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    fullscreenControl: false,
    streetViewControl: false,
    styles: LightColorMapStyle
  };

  setDefaultMapOptions(options) {
    this.defaultMapOptions = {...this.defaultMapOptions, ...options}
  }

  renderMap(elem, options) {
    options = {...options, ...this.defaultMapOptions};
    return new google.maps.Map(elem, options);
  }

  setKey(key) {
    if (document) {
      this.loadGoogleMaps(key, () => {
        // this.loadMarkerCluster();
        // this.loadRichMarker();
      });
      return true;
    }
    return false;
  }

  private loadGoogleMaps(key, cb) {
    const url = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=geometry,visualization`;
    this.loadScript(url, cb)
  }

  private loadMarkerCluster() {
    // const url = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    // this.loadScript(url)
    // import("./markerclusterer")
  }

  private loadRichMarker() {
    // const url = "http://googlemaps.github.io/js-rich-marker/src/richmarker-compiled.js";
    // this.loadScript(url)
    // import("./richmarker")
  }

  private loadScript(url, cb?) {
    var script = document.createElement("script");
    script.src = url;
    if(cb) script.onload = cb();
    document.head.appendChild(script);
  }

  updatePositionPopup(
    marker,
    position,
    infoContent: string,
    defaultOption = {}
  ) {
    marker.setPosition(position);
    this.updatePopup(marker, infoContent, defaultOption);
  }

  updatePopup(marker, infoContent, defaultOption) {
    // if(marker.getPopup()) {
    //   marker.setPopupContent(infoContent)
    // } else {
    //   marker.bindPopup(infoContent, defaultOption);
    // }
  }

  setMap (item, map: google.maps.Map) {
    if (!map) {
      item.setMap(null);
    } else if ((item && !item.getMap) || (item && !item.getMap())) {
      item.setMap(map);
    }
  };

  setStyle = (item, style) => {
    item.setOptions(style);
  };

  clearItem (item) {
    item.setMap(null);
  };


  updatePosition(
    marker,
    position,
    infoContent: string = "",
    defaultOption = {}
  ) {
    position = this.getLatlng(position);
    marker.setPosition(position);
    // if(infoContent) HtUpdateTooltip(marker, infoContent, defaultOption)
  }

  updateTooltip(marker: HtMarker, infoContent, defaultOption) {
    // if(marker.getTooltip()) {
    //   marker.setTooltipContent(infoContent)
    // } else {
    //   marker.bindTooltip(infoContent, defaultOption);
    // }
  }

  setCircleStyle (item, style)  {
    let circleStyle = {
      ...style,
      icon: {
        ...style.icon,
        path: google.maps.SymbolPath.CIRCLE,
      }
    };
    this.setStyle(item, circleStyle)
  }

  setPolylineStyle (polyline, style) {
    this.setStyle(polyline, style);
  };

  openTooltip(item, content?: string) {
    // if(content) item.setTooltipContent(content);
    // item.openTooltip()
  }

  closeTooltip(item) {
    // item.closeTooltip()
  }

  openPopup(item, map, content?: string, popup?) {
    if (popup) {
      popup.setContent(content);
      // console.log(item.getPosition().lat());
      popup.open(map, item);
    }
    // if(content) item.setPopupContent(content);
    // item.openPopup()
  }

  closePopup(item) {
    // item.closePopup()
  }

  bringToFront(item) {
    // item.bringToFront()
  }

  setFocus(item, map: google.maps.Map, { zoom, force = false, center }) {
    if ((item && item.getMap()) || force) {
      let markerCenter = this.getItemLatlng(item);
      if (center) map.setCenter(markerCenter);
      if (zoom && center) map.setZoom(zoom);
      // item.setAnimation(google.maps.Animation.DROP);
      // setTimeout(() => {
      //   item.setAnimation(null);
      //
      // }, 1000)
    }
  }

  getItemLatlng(item) {
    return item.getPosition();
  }

  updateCirclePosition(circle, position) {
    circle.setCenter(position);
  }

  extendBounds(position: HtPosition, bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds()): HtBounds {
    let latlng = this.getLatlng(position);
    bounds.extend(latlng);
    return bounds
  }

  getCircleMarker() {
    return new google.maps.Marker();
  }

  getMarker() {
    return new google.maps.Marker();
  }

  getMarkerCluster(map) {
    // console.log("get", map);
    return new MarkerClusterer(map, [], {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });
  }

  removeClusterMarkers(cluster) {
    cluster.clearMarkers();
  }

  removeClusterMarker(cluster, marker) {
    cluster.removeMarker(marker);
  }

  addMarkersToCluster(cluster, markers, map) {
    // if(listAll.length) console.log(map, "map", listAll[0]);
    // cluster.setMap(map);
    let clusterMarkers = cluster.getMarkers();
    markers.forEach(marker => {
      // if(markerEntity[marker['id']]) {
      //
      // } else {
      //   cluster.addMarker(marker)
      // }
      //alternate aproach
      if (clusterMarkers.indexOf && clusterMarkers.indexOf(marker) > -1) {
      } else {
        cluster.addMarker(marker);
      }
    });

    // var hasId = clusterMarkers && clusterMarkers.length && clusterMarkers[0]['id'];
    // if(hasId) {
    //   let markerEntity = _.indexBy(clusterMarkers, 'id');
    //   listAll.forEach((marker) => {
    //     if(markerEntity[marker['id']]) {
    //
    //     } else {
    //       cluster.addMarker(marker)
    //     }
    //   })
    // } else {
    //   _.each(listAll, (marker) => {
    //     // console.log(marker.getPosition().lng());
    //     cluster.removeMarker(marker);
    //     cluster.addMarker(marker)
    //     // if(marker.getPosition()) {
    //     //   console.log("hit", marker);
    //     //   cluster.addMarker(marker)
    //     // }
    //   })
    // }

    // cluster.addMarkers(listAll)
    // this.markerCluster.addLayers(listAll);
    // this.markerCluster.refreshClusters(listAll);
  }

  extendItemBounds(
    item = null,
    bounds: google.maps.LatLngBounds,
    force = false
  ) {
    bounds = bounds || new google.maps.LatLngBounds();
    if (force || (item && item.getMap() && item.getPosition)) {
      let p = item.getPosition();
      let l = {lat: p.lat(), lng: p.lng()};
      bounds.extend(l);
    }
    if (item && item.getMap() && item.getCenter) {
      bounds.extend(item.getCenter());
    }
    return bounds;
  }


  extendBoundsWithPolyline (
    polyline: google.maps.Polyline = null,
    bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds()
  ): google.maps.LatLngBounds {
    if (polyline && polyline.getMap()) {
      _.each(polyline.getPath().getArray(), p => {
        let l = { lat: p.lat(), lng: p.lng() };
        bounds.extend(l);
      });
    }
    return bounds;
  };

  setEncodedPath (
    polyline: google.maps.Polyline,
    encodedPolyline: string
  ) {
    var path = google.maps.geometry.encoding.decodePath(encodedPolyline);
    return polyline.setPath(path);
  };

  getPopup(options: {}) {
    let defaultOption = {
      disableAutoPan: true,
      pixelOffset: new google.maps.Size(0, -37)
    };
    options = { ...defaultOption, ...options };
    return new google.maps.InfoWindow(options);
  }

  getPolyline() {
    return new google.maps.Polyline();
  }

  setBounds(
    map: google.maps.Map,
    bounds: google.maps.LatLngBounds,
    padding: number = 0
  ) {
    let newBounds = new google.maps.LatLngBounds(
      bounds.getSouthWest(),
      bounds.getNorthEast()
    );
    map.fitBounds(newBounds);
  }

  isValidBounds(bounds: google.maps.LatLngBounds): boolean {
    // console.log(bounds);
    // return !bounds.isEmpty()
    return !this.getBoundsFix(bounds).isEmpty();
  }

  getBoundsFix(bounds) {
    return new google.maps.LatLngBounds(
      bounds.getSouthWest(),
      bounds.getNorthEast()
    );
  }

  invalidateSize(map) {
    google.maps.event.trigger(map, "resize");
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
    if (event == 'move') event = 'bounds_changed';
    item.addListener(event, e => {
      cb(e);
    });
  }

  removeEvent(item, event, cb?) {
    if (event == 'move') event = 'bounds_changed';
    item.removeListener(event, e => {
      cb(e)
    })
  }

  openPopupPosition(position: HtPosition, map, content, popup) {
    popup.setContent(content);
    popup.setPosition(this.getLatlng(position));
    popup.setMap(map);
  }

  setDivContent(marker, content, options) {
    let currentContent = marker.getContent ? marker.getContent() : null;
    if (currentContent != content) {
      marker.setContent(content);
      this.setDivMarkerStyle(marker, options);
    }
  }

  getDivMarker() {
    return new RichMarker({});
  }

  setDivMarkerStyle(item, options: any = {}) {
    let { zIndex, flat, anchor } = options;
    if (zIndex) item.setZIndex(zIndex);
    if (flat) item.setFlat(flat);
    if (anchor) item.setAnchor(anchor);
  }

  getHeatmap(options = {}) {
    let heatmap = new google.maps.visualization.HeatmapLayer({data: [], ...options});
    return heatmap;
  }

  updateHeatMapLatlng(latlngs, heatmap) {
    let latlngsPos = latlngs.map((pos: HtPosition) => this.getLatlng(pos));
    heatmap.setData(latlngsPos)
  }

  setPathPositionTimeArray (
    polyline,
    positionTimeArray: ITimeAwarePoint[]
  ) {
    let path = _.map(positionTimeArray, (point: ITimeAwarePoint) => {
      return this.getLatlng({ lat: +point[0], lng: +point[1] });
    });
    return polyline.setPath(path);
  };


  setPath(polyline: google.maps.Polyline, path: HtPosition[]) {
    let newPath = path.map(pos => {
      return this.getLatlng(pos)
    })  ;
    polyline.setPath(newPath)
  };

  getLatlng ({ lat, lng }: HtPosition = { lat: 0, lng: 0 }) {
    return new google.maps.LatLng(lat, lng);
  };

  getItemPosition(item) {
    let position = item.getPosition();
    return position ? {lat: position.lat(), lng: position.lng()} : null
  }

  getElement(item) {
    return item ? item.markerWrapper_ : null
  }

}