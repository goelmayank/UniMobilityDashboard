import { OnDestroy, OnInit } from '@angular/core';
import { IAnalyticsList } from "../interfaces/analytics-list";
import { IUserAnalytics } from "ht-models";
export declare class UsersAnalyticsListComponent implements OnInit, OnDestroy {
    listService: IAnalyticsList;
    selectedUser: IUserAnalytics | null;
    constructor();
    ngOnInit(): void;
    showUserDetail(row: any): void;
    closeModal(): void;
    ngOnDestroy(): void;
}
