import {HtMapType} from "ht-map-wrapper";
import {GoogleMapUtilsClass} from "ht-google-maps-wrapper";
import {LeafletMapUtilsClass} from "ht-leaflet-wrapper";

export const mapTypeService = (() => {
  var instance;
  var currentmapType;
  function getMapType(mapType?: HtMapType) {
    switch (mapType) {
      case 'leaflet': {
        return  new LeafletMapUtilsClass()
      }
      case 'google': {
        return new GoogleMapUtilsClass()
      }
      default: {
        return new GoogleMapUtilsClass()
      }
    }
  }
  return {
    getInstance(mapType?: HtMapType) {
      if (!instance || !currentmapType) {
        currentmapType = mapType;
        instance = getMapType(mapType);
      }
      return instance;
    }
  };
})();