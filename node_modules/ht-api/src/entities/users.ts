import { HtBaseApi } from "./base";
import { Observable } from "rxjs/Observable";
import { IUserAnalyticsPage } from "ht-models";

export class HtUsersApi extends HtBaseApi {
  name = "user";

  constructor(request) {
    super(request, "users");
  }

  analytics(query, token?: string): Observable<IUserAnalyticsPage> {
    let path = `${this.base}/analytics/`;
    return this.api$<IUserAnalyticsPage>(path, query, {token});
  }
}
