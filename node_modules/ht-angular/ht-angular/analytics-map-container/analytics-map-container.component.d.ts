import { OnInit } from '@angular/core';
import { IAnalyticsMapService } from "../interfaces/analytics";
export declare class AnalyticsMapContainerComponent implements OnInit {
    service: IAnalyticsMapService;
    mapOptions: {
        scrollWheelZoom: boolean;
    };
    constructor();
    ngOnInit(): void;
}
