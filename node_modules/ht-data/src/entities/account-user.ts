import _ from "underscore";
import {
  IAccount,
  IAccountUser,
  IMembership,
  ISubAccount,
  IToken
} from "ht-models";

export function UpdateSubAccountOfAccount(
  account: IAccount,
  updatedSubAccount: ISubAccount,
  tokenType
): IAccount {
  let subAccounts = _.map(account.sub_accounts, (subAccount: ISubAccount) => {
    if (subAccount.type == tokenType) {
      return { ...subAccount, ...updatedSubAccount };
    } else {
      return subAccount;
    }
  });
  return { ...account, sub_accounts: subAccounts };
}

// export function UpdateAccountOfAccountUser(accountUser: IAccountUser, account: IAccount, config): IAccountUser {
//   let memberships = _.map(accountUser.memberships, (member: IMembership) => {
//     let isMember = IsCurrentMember(member, config.currentToken, config.tokenType);
//     return isMember ? {...member, account: account} : member;
//   });
//   let defaultAccount = account.id == accountUser.default_account.id ? account : accountUser.default_account;
//   return {...accountUser, memberships: memberships, default_account: defaultAccount};
// }

// export function GetAccountFromAccountUser (accountUser: IAccountUser, currentToken: string, tokenType: 'test' | 'production') {
//   if(!accountUser) return null;
//   if(isCurrentAccount(accountUser.default_account, currentToken, tokenType)) {
//     return accountUser.default_account;
//   }
//   let membership = _.find(accountUser.memberships, (member: IMembership) => {
//     return isCurrentAccount(member.account, currentToken, tokenType);
//   });
//   return membership ? membership.account : null
// }

export function isCurrentAccount(
  account: IAccount,
  token: string,
  tokenType: "test" | "production"
): boolean {
  return GetSecretToken(account, tokenType) == token;
}

export function IsCurrentMember(
  member: IMembership,
  token: string,
  tokenType: "test" | "production"
) {
  return GetSecretToken(member.account, tokenType) == token;
}

export function GetSecretToken(
  account: IAccount,
  tokenType: "test" | "production"
): string {
  return getToken(getSubAccountToken(account, tokenType), "secret");
}

export const getToken = (subAccounts: IToken[], type: string): string => {
  let tokenObject = _.find(subAccounts, token => {
    return token.scope == type;
  });
  return tokenObject ? tokenObject.key : null;
};

export function getAccountFromAccountUserId(accountUser, accountId) {
  if (!accountUser) return null;
  if (accountUser.default_account.id == accountId) {
    return accountUser.default_account;
  } else {
    let membership = _.find(accountUser.memberships, (member: IMembership) => {
      return (member.account.id = accountId);
    });
    return membership ? membership.account : null;
  }
}

function getSubAccountToken(account: IAccount, type) {
  return _.find(account.sub_accounts, subAccount => {
    return subAccount.type == type;
  }).tokens;
}

export const getAuthHeaders = token => {
  return { Authorization: `token ${token}` };
};
