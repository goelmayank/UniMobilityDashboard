import { HtBaseApi } from "./base";
import { Observable } from "rxjs/Observable";
import { IAccountUser } from "ht-models";
import { Page, IMembership } from "ht-models";
import {HtRequest} from "../core/request";

export class HtAccountUserApi extends HtBaseApi {
  name = "user";

  constructor(request: HtRequest) {
    super(request, "account_users");
  }

  login(user: {
    username: string;
    password: string;
  }): Observable<IAccountUser> {
    let tail = `login/`;
    return this.request.postObservable<IAccountUser>(
      this.request.baseUrl + tail,
      user
    );
  }

  get<IAccountUser>(id, token): Observable<IAccountUser> {
    let path = `${this.base}/${id}/`;
    return this.api$(path, {}, { isAdmin: true });
  }

  memberships(id, query = {}, options?: object) {
    const path = `${this.base}/${id}/memberships/`;
    return this.api$(path, query, options);
  }

  membershipsAll(id, query, token?: string) {
    const options = {isAdmin: true, token};
    return this.allPages(this.memberships(id, query, options), options)
  }
}
