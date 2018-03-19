import { SingleItemMixin } from "../mixins/single-item";
import { PopupMixin } from "../mixins/popup-renderer";
import { DivMarkersMixin } from "../mixins/div-markers-renderes";
import { CircleMixin } from "../mixins/circle-renderer";
import { MarkersMixin } from "../mixins/marker-renderer";
import { TraceMixin } from "../mixins/trace";
import { DataObservableMixin } from "../mixins/data-observable";
import { PolylinesMixin } from "../mixins/polyline-renderer";
import { ClusterMixin } from "../mixins/clusters";
import * as _ from "underscore";
import { StyleMixin } from "../mixins/styles";
import {DataConfig, StyleFunct, StyleObj} from "../interfaces";
import { MarkersBase } from "./markers.factory";
import { PolylinesBase } from "./polylines.factory";
import { DivMarkersBase } from "./div-markers.factory";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";

export const mapItemsFactory = (
  baseClass,
  config: Partial<MapItemsFactoryConfig>
) => {
  const defaultConfig: MapItemsFactoryConfig = {
    isCluster: false,
    hasPopup: false,
    isPolyline: false,
    isDiv: false,
    isSingleItem: false,
    isCircle: false,
    hasDataObservable: false
  };
  const finalConfig: MapItemsFactoryConfig = {
    ...defaultConfig,
    ...config
  };

  let mixins = [];
  var itemClass = baseClass;
  itemClass = MarkersMixin(itemClass);
  itemClass = StyleMixin(itemClass);
  itemClass = TraceMixin(itemClass);
  itemClass = ExtendBoundsMixin(itemClass);
  if (finalConfig.isSingleItem) itemClass = SingleItemMixin(itemClass);
  if (finalConfig.hasPopup) itemClass = PopupMixin(itemClass);
  if (finalConfig.isCluster) itemClass = ClusterMixin(itemClass);
  if (finalConfig.isDiv) itemClass = DivMarkersMixin(itemClass);
  if (finalConfig.isCircle) itemClass = CircleMixin(itemClass);
  if (finalConfig.isPolyline) itemClass = PolylinesMixin(itemClass);
  if (finalConfig.hasDataObservable) itemClass = DataObservableMixin(itemClass);
  return itemClass;
};

export interface MapItemsFactoryConfig {
  isCluster: boolean;
  hasPopup: boolean;
  isDiv: boolean;
  isCircle: boolean;
  isSingleItem: boolean;
  hasDataObservable: boolean;
  isPolyline: boolean;
}

export const itemsBaseFactory = ({
  renderConfig,
  typeConfig,
  styleFunct
}: ItemClassFactoryConfig) => {
  let mapTypesBase = {
    polylines: PolylinesBase,
    markers: MarkersBase,
    divMarkers: DivMarkersBase
  };
  typeConfig = typeConfig || {};
  let MapItemBase: any = mapTypesBase.markers;
  if (typeConfig.isDiv) MapItemBase = mapTypesBase.divMarkers;
  if (typeConfig.isPolyline) MapItemBase = mapTypesBase.polylines;
  var base = mapItemsFactory(MapItemBase, typeConfig);
  return base;
};

export const itemsFactory = ({
  renderConfig,
  typeConfig,
  styleFunct,
  styleObj
}: ItemClassFactoryConfig) => {
  var base = itemsBaseFactory({ renderConfig, typeConfig, styleFunct: styleFunct });

  function getStyleFunct(styleObj: StyleObj): StyleFunct {
    return {
      get(type) {
        return styleObj[type];
      }
    }
  }
  return new base(renderConfig, styleFunct || getStyleFunct(styleObj));
};

export interface ItemClassFactoryConfig {
  renderConfig: DataConfig<any>;
  typeConfig?: Partial<MapItemsFactoryConfig>;
  styleFunct?: StyleFunct;
  styleObj?: StyleObj;
  name?: string;
}
