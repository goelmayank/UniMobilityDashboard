import { IAccount } from "./account";
import { Page } from "./common";

export interface IMembership {
  id: string;
  role: string;
  status: string;
  account: IAccount;
  read_token: string;
}

export type IPageMembership = Page<IMembership>;
