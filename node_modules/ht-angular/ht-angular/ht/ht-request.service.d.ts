import { Observable } from "rxjs/Observable";
import { HtRequest } from "ht-api";
import { HttpClient } from "@angular/common/http";
export declare class HtRequestService extends HtRequest {
    private http;
    constructor(http: HttpClient, token: any);
    getObservable<T>(url: any, options?: object): Observable<T>;
    postObservable<T>(url: any, body: any, options?: object): Observable<T>;
}
