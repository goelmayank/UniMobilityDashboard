import { StyleFunct } from "../interfaces";
import { MapInstance } from "../map-utils/map-instance";

export class StyleClass {
    mapInstance: MapInstance
    styleFunct: StyleFunct;
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
  

  
      getStyle(selectedStyleType: string = "default", fallbackStyle?) {
        const mapType = this.mapInstance.mapUtils.type;
        const styleFunct = this.styleFunct || this.defaultstyleFunct;
        const mapTypetype = this.styleObj || styleFunct.get(mapType);
        // console.log(this.name, "style", selectedStyleType, styleFunct, this.styleFunct);
        // const styleType = mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
        const style = mapTypetype[selectedStyleType] || fallbackStyle;
        if (!style)
          console.error(
            "style type does not exist ",
            selectedStyleType
          );
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
  
      getStyleType(data) {
        if (this.highlightedId && data) {
          return this.highlightedId == data.id ? 'highlight' : 'fade'
        } else {
          return this.styleType;
        }
      }
  
      setItemStyle(item, style) {
        this.mapInstance.mapUtils.setStyle(item, style);
      }
}