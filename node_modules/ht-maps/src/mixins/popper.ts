// import {Entities, Entity} from "../interfaces";
// import {MapInstance} from "../map-utils/map-instance";
// import { Constructor } from "ht-models"
// import Popper from "popper.js";
//
// export interface IPopperBase {
// 	traceEffect? (): any;
// 	getEntity(): Entity;
// 	update(entity: Entity, pathBearingTime): void;
// 	entities: Entities<any>
// 	  mapInstance: MapInstance,
// 	  removeItem(item): void
// 	// getStyle: (styleType?) => object;
// }
//
// export function PopperMixin<TBase extends Constructor<IPopperBase>>(Base: TBase) {
// 	return class extends Base {
// 		popper;
// 		constructor(...arg: any[]) {
// 			super(...arg);
// 		}
//
// 		update(entity: Entity, pathBearingTime) {
// 			super.update(entity, pathBearingTime);
//       setTimeout(() => {
//       	const keys = Object.keys(this.entities);
//       	const item = this.entities[keys[0]].item
//         console.log("El", item);
//         const elem = this.entities[keys[0]].item.getElement();
//         if (!elem) {
// 					this.popper && this.popper.destory()
// 				} else if (this.popper) {
// 					this.popper.scheduleUpdate()
// 				} else if(elem) {
// 					const dom = this.getPopper(entity);
// 					this.popper =  new Popper(elem, dom);
// 					this.mapInstance.addPopper(this.popper);
// 				}
// 			})
//
// 		}
//
// 		getPopper(entity) {
//       var dom: Element = document.createElement("div");
//       dom.innerHTML = `${entity.data.name}`;
//       dom.className = "poppercard card";
//       console.log(dom);
//       document.body.appendChild(dom);
//       return dom;
//     }
//
// 		removeItem(item) {
// 			if(this.popper) this.popper.destroy();
// 			this.mapInstance.removePopper(this.popper);
// 			this.popper = null;
// 			super.removeItem(item)
// 		}
// 	};
// }