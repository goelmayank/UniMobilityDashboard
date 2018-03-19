import { OnInit } from '@angular/core';
import { HtUsersService } from "../ht/ht-users.service";
import { HtMapService } from "../ht/ht-map.service";
export declare class PlacelineMapContainerComponent implements OnInit {
    private userClientService;
    private mapService;
    userId: string | null;
    showSidebar: boolean;
    userData$: any;
    constructor(userClientService: HtUsersService, mapService: HtMapService);
    ngOnInit(): void;
}
