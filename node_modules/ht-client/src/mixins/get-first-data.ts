import { expand, switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Constructor } from "ht-models";

export interface IIdQueryFirstDataBase {
  firstDataEffect(any): void;
  api$(...args: any[]): Observable<any>;
}

export function getFirstDataMixin<
  TBase extends Constructor<IIdQueryFirstDataBase>
>(Base: TBase) {
  return class extends Base {
    getFirstData$(args) {
      let entity = this;
      return entity.api$(...args).pipe(
        tap(data => {
          this.firstDataEffect(data);
        })
      );
    }
  };
}
//
// export interface IQueryFirstDataBase {
//   setLoading(any): void,
//   api$(query): Observable<any>
// }
//
// export function getQueryFirstDataMixin <TBase extends Constructor<IQueryFirstDataBase>>(Base: TBase) {
//   return class extends Base {
//     getFirstData$([query]) {
//       let entity = this;
//       return entity.api$(query).pipe(
//         tap((data) => {
//           this.setLoading(false);
//         })
//       );
//     }
//   }
// }
