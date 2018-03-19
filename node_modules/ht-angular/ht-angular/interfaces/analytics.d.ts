import { IDateRange } from "ht-models";
import { Observable } from "rxjs/Observable";
import { DateRange } from "ht-client";
import { MapInstance } from "ht-maps";
export interface IAnalyticsServiceConfig {
    title: string;
    tags?: string[];
    initialDateRange?: IDateRange;
    updateStrategy?: string;
}
export interface IAnalyticsService extends IAnalyticsServiceConfig {
    component: any;
    className: string;
    noData: boolean;
    tags: string[];
    loading$: Observable<boolean>;
    minHeight?: number;
    dateRangeService$?: DateRange;
    setData(instance: any): void;
    setActive(active?: boolean): void;
}
export interface IAnalyticsMapService extends IAnalyticsService {
    mapLoading$: Observable<boolean>;
    mapInstance: MapInstance;
    setMapType(mapType: any): void;
}
