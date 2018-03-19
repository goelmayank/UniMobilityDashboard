import { getIdQueryDataMixin } from "../../mixins/get-data";
import { clientSubMixin } from "../../mixins/client-subscription";
import { itemQueryMixin } from "../../mixins/entity-query";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as fromAccounts from "../../dispatchers/accounts-dispatcher";
import { IPageClientConfig } from "../../interfaces";
import { getFirstDataMixin } from "../../mixins/get-first-data";
import { EntityItemClient } from "../../base/item-client";
import { IAccountUser } from "ht-models"
export class AccountUser extends EntityItemClient {
    query$: Observable<object> = of({});
    id$;
    updateStrategy = "once";
    pollDuration = 10000;
    store;
    data$;
    loading$;
    api$: (id, query) => Observable<IAccountUser>;
    constructor({ dateParam, store, api }: IPageClientConfig) {
        super();
        this.api$ = (id, query) => api.get(id, query);
        this.store = store;
        // this.active$ = this.store.select(fromRoot.getUsersAnalyticsIsActive);
        this.data$ = this.store.select(fromRoot.getAccountUser);
        this.id$ = this.store.select(fromRoot.getAccountUserId);
        this.loading$ = this.store.select(fromRoot.getAccountCurrentKey);
        // this.init()
    }

    getDefaultQuery() {
        return {};
    }

    setId(id) {
        this.store.dispatch(new fromAccounts.SetUserId(id));
    }

    setLoading(loading) {}

    setData(data) {
        this.store.dispatch(new fromAccounts.SetAccountUser(data));
    }


}

export const AccountUserClient = clientSubMixin(
    getIdQueryDataMixin(getFirstDataMixin(itemQueryMixin(AccountUser)))
);
