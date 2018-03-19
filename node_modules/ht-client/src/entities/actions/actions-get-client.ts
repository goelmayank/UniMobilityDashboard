import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";

export class HtActionsGetClient {
  name = "actions get";

  // api$(id, query) {
  //   return this.api.get<IAction>(id, {...this.defaultQuery, ...query})
  // }

  get id$() {
    return empty();
  }

  get loading$() {
    return this.id$;
  }

  get query$() {
    return of({});
  }

  setData(data) {}
}
