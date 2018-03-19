import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { empty } from "rxjs/observable/empty";
import { switchMap } from "rxjs/operators";
import { Constructor } from "ht-models";

export interface IListAllClientSubBase {
  getApiParams$(): Observable<any>;
  setLoading(loading: boolean | string): void;
  getData$(data): any;
  addData(data): void;
}

export function listAllClientSubMixin<
  TBase extends Constructor<IListAllClientSubBase>
>(Base: TBase) {
  return class extends Base {
    dataSub: Subscription;

    constructor(...args: any[]) {
      super(...args);
      this.init();
    }

    init() {
      if (!this.dataSub) {
        this.dataSub = this.getApiParams$()
          .pipe(
            switchMap(data => {
              if (data && data[0]) {
                let loading = typeof data[0] === "string" ? data[0] : true;
                this.setLoading(loading);
                return this.getData$(data);
              } else {
                return empty();
              }
            })
          )
          .subscribe(data => {
            this.addData(data);
          });
      }
    }
  };
}
