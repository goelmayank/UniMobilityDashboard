import { OnDestroy, OnInit } from '@angular/core';
import { AnalyticsItemsService } from "./analytics-items.service";
export declare class AnalyticsContainerComponent implements OnInit, OnDestroy {
    analyticsItemsService: AnalyticsItemsService;
    configure: boolean;
    constructor(analyticsItemsService: AnalyticsItemsService);
    ngOnInit(): void;
    openConfig(): void;
    trackByFn(index: any, item: any): any;
    ngOnDestroy(): void;
}
