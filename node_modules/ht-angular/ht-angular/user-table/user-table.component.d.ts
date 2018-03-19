import { OnInit } from '@angular/core';
import { IUserAnalytics, IUser } from "ht-models";
import { IAction } from "ht-models";
export declare class UserTableComponent implements OnInit {
    user: IUserAnalytics | IUser;
    action: IAction;
    excludedKey: string[];
    constructor();
    ngOnInit(): void;
    readonly tableData: any[];
    readonly actionData: any[];
    readonly currentUser: IUser | IUserAnalytics;
    isKeyIncluded(key: any): boolean;
}
