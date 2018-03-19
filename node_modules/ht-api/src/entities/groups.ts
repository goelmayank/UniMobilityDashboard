import { HtBaseApi } from "./base";
import {IGroup, Page} from "ht-models";
import {Observable} from "rxjs/Observable";

export class HtGroupsApi extends HtBaseApi {
  name = "group";

  constructor(request) {
    super(request, "groups");
  }

  children(groupId: string, token?: string): Observable<Page<IGroup>> {
    const query = { parent_group_id: groupId };
    return this.getAll(query, token)
  }

  root(token?: string): Observable<Page<IGroup>> {
    const query = { has_parent: false };
    return this.getAll(query, token)
  }

  getAll(query, token?: string) {
    return this.allPages(this.index(query, token))
  }
}
