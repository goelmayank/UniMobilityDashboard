import { Constructor, StyleFunct } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IStyleBase {
  styleFunct: StyleFunct;
  name?: string;
  mapInstance: MapInstance;
  trackBy(datum): string;
  isAnimated?: boolean;
}
export function StyleMixin<TBase extends Constructor<IStyleBase>>(Base: TBase) {
  return class extends Base {
    defaultstyleFunct: StyleFunct = {
      get(type) {
        return {
          default: {}
        }
      }
    };
    styleType: string;
    highlightedId: string | null = null;
    styleObj: object;

    constructor(...args: any[]) {
      super(...args);
    }

    getStyle(selectedStyleType: string = "default", fallbackStyle?) {
      const mapType = this.mapInstance.mapUtils.type;
      const styleFunct = this.styleFunct || this.defaultstyleFunct;
      const mapTypetype = this.styleObj || styleFunct.get(mapType);
      // console.log(this.name, "style", selectedStyleType, styleFunct, this.styleFunct);
      // const styleType = mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
      let style = mapTypetype[selectedStyleType] || fallbackStyle;
      if (!style)
        console.error(
          "style type does not exist ",
          this.name,
          selectedStyleType
        );
      if (this.isAnimated && style) style = {...style, className: style['className'] ? `${style['className']} animated-marker`: 'animated-marker'};
      return style;
    }

    setStyleType(styleType: string = 'default') {
      this.styleType = styleType;
    }


    setStyle({item, data}) {
      const styleType = this.getStyleType(data);
      const style = this.getStyle(styleType);
      this.setItemStyle(item, style);
    }

    getStyleType(datum) {
      if (this.highlightedId && datum) {
        return this.highlightedId == this.trackBy(datum) ? 'highlight' : 'fade'
      } else {
        return this.styleType;
      }
    }

    setItemStyle(item, style) {
      this.mapInstance.mapUtils.setStyle(item, style);
    }
  };
}

// export class Styles {
//   styleFunct: StyleFunct = {
//     google: {
//       default: {
//
//       }
//     },
//     leaflet: {
//       default: {
//
//       }
//     }
//   };
//
//   styleType = 'default';
//
//   getStyle(selectedStyleType: string = 'default', fallbackStyle?) {
//     const mapType = GlobalMap.mapUtils.type;
//     const mapTypetype = this.styleFunct[mapType];
//     const styleType = selectedStyleType && mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
//     const style = mapTypetype[styleType] || fallbackStyle;
//     if(!style) console.error("style type does not exist");
//     return this.styleFunct[mapType][styleType]
//   }
// }
