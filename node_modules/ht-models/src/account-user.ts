import { IMembership } from "./membership";
import { IAccount } from "./account";

export interface IAccountUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  default_account: IAccount;
  is_new_user: boolean;
  is_staff?: boolean;
}
