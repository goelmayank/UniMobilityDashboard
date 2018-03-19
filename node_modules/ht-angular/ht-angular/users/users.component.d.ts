import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IUserAnalytics } from "ht-models";
export declare class UsersComponent implements OnInit, OnDestroy {
    users: IUserAnalytics[];
    selectedUserId: string | null;
    selectedUserDataId: string | null;
    loadingUserDataId: string | null;
    hasMap: boolean;
    showExtraBtn: boolean;
    onSelectUser: EventEmitter<string | null>;
    onAction: EventEmitter<string | null>;
    onHover: EventEmitter<string | null>;
    constructor();
    ngOnInit(): void;
    getAction(user: any): "default" | "close" | "loading" | "detail";
    indexId(index: any, item: any): any;
    selectUser(user: any): void;
    hover(id: string | null): void;
    ngOnDestroy(): void;
}
