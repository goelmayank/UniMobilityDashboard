import * as fromAccount from "../../reducers/account-reducer";
import { ApiStoreService } from "../../global/store-provider";
import { AccountUserClient } from "./account-user-client";
import { MemberShipsClient } from "./memberships-all-client";
import * as fromRoot from "../../reducers";
import * as fromAccounts from "../../dispatchers/accounts-dispatcher";
import {HtApi} from "ht-api";

export class AccountsClient {
  api;
  store;
  accountUser;
  memberships;
  constructor() {
    let api = new HtApi().accountUser;
    this.api = api;
    this.store = ApiStoreService.getInstance();
    this.store.addReducer("accounts", fromAccount.reducer);
    this.accountUser = new AccountUserClient({ store: this.store, api });
    this.memberships = new MemberShipsClient({ store: this.store, api });
  }

  setToken(token) {
    this.store.dispatch(new fromAccounts.SetKey(token));
  }
}
