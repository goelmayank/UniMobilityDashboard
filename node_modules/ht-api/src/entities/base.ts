import { Observable } from "rxjs/Observable";
import { IPageData } from "ht-models";
import { expand, map } from "rxjs/operators";
import { empty } from "rxjs/observable/empty";
import {HtRequest} from "../core/request";

export class HtBaseApi {

  constructor(public request: HtRequest, public base: string) {}

  get<T>(id: string, query = {}, token?: string): Observable<T> {
    let path = `${this.base}/${id}/`;
    return this.api$<T>(path, query, {token});
  }

  index<T>(query = {}, token?: string): Observable<T> {
    let path = `${this.base}/`;
    return this.api$<T>(path, query, {token});
  }

  summary<T>(query = {}, token?: string): Observable<T> {
    let path = `${this.base}/summary/`;
    return this.api$<T>(path, query, {token});
  }

  heatmap<T>(query = {}, token?: string): Observable<T> {
    let path = `${this.base}/heatmap/`;
    return this.api$(path, query, {token});
  }

  api$<T>(path, query = {}, options: {isAdmin?: boolean, token?: string} = {}): Observable<T> {
    return this.request.api$(path, query, options);
  }

  postApi$<T>(path: string, body, options: {isAdmin?: boolean, token?: string} = {}): Observable<T> {
    return this.request.postApi$(path, body, options);
  }

  // getReqFromTail<T>(tail, query = {}, options = {}): Observable<T> {
  //   return this.request.api$(this.base + tail, query, options)
  // }
  //
  // postReqFromTail<T>(tail, body, options?): Observable<T> {
  //   return this.request.postApi$(this.base + tail, body, options)
  // }

  placeline<T>(id, query = {}, token?: string): Observable<T> {
    let tail = this.base + `/${id}/placeline/`;
    return this.api$<T>(tail, query, {token});
  }

  allPages<T = any>(api$, options: {isAdmin?: boolean, token?: string} = {}) {
    return api$.pipe(
      expand((data: IPageData) => {
        return data["next"]
          ? this.request.api$(data["next"], {}, {...options, pureUrl: true}).pipe(
            map((newData: IPageData) => {
              return {...newData, results: [...data.results, ...newData.results]}
            })
          )
          : empty();
      })
    );
  }

  analytics(query): Observable<any> {
    return empty();
  }
}
