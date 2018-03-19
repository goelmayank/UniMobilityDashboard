import { AfterContentInit, OnDestroy, OnInit } from '@angular/core';
import { HtUsersService } from "../ht/ht-users.service";
import { HtMapService } from "../ht/ht-map.service";
export declare class MapContainerComponent implements OnInit, AfterContentInit, OnDestroy {
    private userClientService;
    private mapService;
    showLoading: boolean;
    subs: any[];
    loading$: any;
    constructor(userClientService: HtUsersService, mapService: HtMapService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
