import { HtBounds, HtMap, HtMapType } from "ht-map-wrapper";
import { PlacelineTrace } from "../compound-entities/placeline-trace";
import { IUserData } from "ht-models";
import { UsersClusterTrace} from "../entities/users-cluster";
import { LightColorMapStyle } from "ht-google-maps-wrapper";
import * as _ from "underscore";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { StopsHeatmapTrace } from "../entities/stops-heatmap"
import {ActionsClusterTrace} from "../entities/actions-cluster"
import {ActionsHeatmapTrace} from "../entities/actions-heatmap";
import {MapInstance} from "../map-utils/map-instance";
import {mapTypeService} from "./map-type";
export class HtMapClass {
  // map: HtMap;
  // mapUtils: MapUtils;
  // userData$: Observable<IUserData | null>;
  mapInstance: MapInstance = new MapInstance();
  userDataSub: Subscription;
  placeline;
  usersCluster;
  usersHeatmap;
  actionsHeatmap;
  actionsCluster;
  leafletSetBoundsOptions: L.PanOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {};
  googleMapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    fullscreenControl: false,
    streetViewControl: false,
    styles: LightColorMapStyle
  };
  leafletMapOptions = { center: [3.505, 0], zoom: 2 };
  mapItemsSet = [];
  // clusters = [];
  // map$ = new ReplaySubject();

  constructor(
    public mapType: HtMapType = "leaflet",
    options: HtMapClassOptions = {}
  ) {
    mapTypeService.getInstance(mapType);
    if(options.mapKey) {
      // mapTypeService.getInstance().setKey(options.mapKey);
    }
    this.usersCluster = new UsersClusterTrace(this.mapInstance);
    this.actionsCluster = new ActionsClusterTrace(this.mapInstance);
    this.usersHeatmap = new StopsHeatmapTrace(this.mapInstance);
    this.actionsHeatmap = new ActionsHeatmapTrace(this.mapInstance);
    this.placeline = new PlacelineTrace({mapInstance: this.mapInstance});
  }

  get segmentTrace() {
    return this.placeline;
  }

  get map$(): ReplaySubject<HtMap> {
    return this.mapInstance.map$ as ReplaySubject<HtMap>;
  }

  get map() {
    return this.mapInstance.map;
  }

  initMap(elem: HTMLElement, options = {}): HtMap {
    let mapOptions =
      this.mapType == "leaflet"
        ? this.leafletMapOptions
        : this.googleMapOptions;
    let map = this.mapInstance.mapUtils.renderMap(elem, {
      ...mapOptions,
      ...options
    });
    this.mapInstance.setMap(map);
    return map;
  }

  // setPlacelineData$(data$: Observable<IUserData | null>) {
  //   if (this.userDataSub) {
  //     this.userDataSub.unsubscribe();
  //   }
  //   this.initUserDataObserver(data$)
  // }
  //
  // private initUserDataObserver(data$: Observable<IUserData | null>) {
  //   let userData$ = data$.scan((acc, data) => {
  //     const oldId = acc.user ? acc.user.id : null;
  //     const currentId = data ? data.id : null;
  //     const isNew = currentId && oldId ? currentId !== oldId : true;
  //     return {user: data, isNew, oldId }
  //   }, {user: null, oldId: null, isNew: true});
  //
  //   let sub = userData$.subscribe((acc) => {
  //     const userData = acc.user;
  //     const isNew = acc.isNew;
  //     this.tracePlaceline(userData);
  //     if(isNew) this.resetBounds()
  //   });
  //   this.userDataSub = sub;
  // }

  tracePlaceline(user: IUserData) {
    this.placeline.trace(user);
  }

  resetBounds(options?) {
    this.mapInstance.resetBounds(options);
  }

  getBoundsItem(items) {
    let bounds = this.mapInstance.mapUtils.extendItemBounds();
    return _.reduce(
      items,
      (bounds, item) => {
        return this.getBounds(bounds, item);
      },
      bounds
    );
  }

  getBounds(bounds, item) {
    return item.extendBounds(bounds);
  }

  setBounds(bounds: HtBounds, options?) {
    options =
      options || this.mapType == "leaflet"
        ? this.leafletSetBoundsOptions
        : this.googleSetBoundsOptions;
    this.mapInstance.mapUtils.setBounds(this.map, bounds, options);
  }

  inValidateSize() {
    this.mapInstance.mapUtils.invalidateSize(this.map);
  }

  addEntities(entities) {
    this.mapInstance.addToItemsSet(entities);
  }

  clear() {
    this.mapInstance.setMap(null)
  }
}

export interface HtMapClassOptions {
  mapKey?: string
}
