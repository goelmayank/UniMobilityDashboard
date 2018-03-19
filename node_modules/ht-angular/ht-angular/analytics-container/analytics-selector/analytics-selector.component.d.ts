import { EventEmitter, OnInit } from '@angular/core';
import { AnalyticsItemsService } from "../analytics-items.service";
export declare class AnalyticsSelectorComponent implements OnInit {
    analyticsItemsService: AnalyticsItemsService;
    selected: EventEmitter<{}>;
    choosenPreset: any[];
    constructor(analyticsItemsService: AnalyticsItemsService);
    ngOnInit(): void;
    isActive(preset: any): boolean;
    togglePreset(preset: any): void;
    setPreset(): void;
}
