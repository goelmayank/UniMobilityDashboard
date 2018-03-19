import { ComponentFactoryResolver, OnInit } from '@angular/core';
import { AnalyticsSlotDirective } from "./analytics-slot.directive";
import { IAnalyticsService } from "../../interfaces/analytics";
export declare class AnalyticsItemComponent implements OnInit {
    private componentFactoryResolver;
    slot: AnalyticsSlotDirective;
    item: IAnalyticsService;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    private addComponent();
}
