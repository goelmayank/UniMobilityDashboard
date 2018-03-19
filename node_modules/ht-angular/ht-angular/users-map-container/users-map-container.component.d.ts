import { OnInit } from '@angular/core';
import { ApiType } from "ht-client";
import { HtUsersService } from "../ht/ht-users.service";
export declare class UsersMapContainerComponent implements OnInit {
    private userClientService;
    hasPlaceline: boolean;
    sidebarWidth: number;
    apiType: ApiType;
    showFilter: boolean;
    showSidebar: boolean;
    showAll: boolean;
    constructor(userClientService: HtUsersService);
    ngOnInit(): void;
}
