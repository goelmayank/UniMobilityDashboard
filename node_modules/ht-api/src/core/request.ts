import { HtQuerySerialize } from "ht-utility";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { HtToken } from "./token";

export class HtRequest {
    baseUrl: string = "https://api.hypertrack.com/api/v1/";
    isAdmin: boolean = false;
    tokenServie: HtToken;
    defaultHeader = {"X-Hypertrack-Client": 'js-sdk'};
    constructor(token?) {
        this.tokenServie = new HtToken(token)
    }

    setClientType(clientType: string) {
        this.defaultHeader = {...this.defaultHeader, "X-Hypertrack-Client": clientType}
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    };


    get token() {
        return this.tokenServie.token;
    }

    get currentToken() {
        const token = this.tokenServie.currentToken;
        return token;
    }

    headerObj(token?) {
        return { Authorization: `token ${token || this.currentToken}`, ...this.defaultHeader };
    };

    adminHeaderObj() {
        return { Authorization: `token ${this.token}`, ...this.defaultHeader };
    }

    headerStrings(): [string, string] {
        return ["Authorization", `token ${this.currentToken}`];
    }

    url(url: string, query = {}, isPure: boolean = false) {
        if (isPure) return url;
        let string = HtQuerySerialize(query);
        return this.baseUrl + url + "?" + string;
    }

    getObservable<T>(url, options: object = {}): Observable<T> {
        let p = this.getFetch(url, options);
        return fromPromise(p) as Observable<T>;
    }

    postObservable<T>(url, body, options: object = {}): Observable<any> {
        let p = this.postFetch(url, body, options);
        return fromPromise(p) as Observable<T>;
    }

    api$<T>(url: string, query, options: {isAdmin?: boolean, token?: string, pureUrl?: boolean} = {}) {
        url = this.url(url, query, options.pureUrl);
        let headers = options.isAdmin  ? this.adminHeaderObj() : this.headerObj(options.token);
        return this.getObservable<T>(url, {headers});
    }

    postApi$(url, body, options?) {
        url = this.url(url);
        let headers = options.isAdmin  ? this.adminHeaderObj() : this.headerObj(options.token);
        return this.postObservable(url, body, {headers});
    }

    getFetch(url, options: object = {}) {
        return fetch(url, options).then(res =>
            res.json()
        );
    }

    postFetch(url, body, options: object = {}) {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            ...options
        }).then(res => res.json());
    }
}

