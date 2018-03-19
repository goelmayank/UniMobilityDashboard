import { Observable } from "rxjs/Observable";
import { IAnalyticsService, IAnalyticsServiceConfig } from "./analytics";
export interface IAnalyticsList extends IAnalyticsService {
    dataTable$: Observable<string[][]>;
    client: any;
    columns: string[];
}
export interface ITableFormat {
    label: string;
    selector(data?: any): string;
}
export interface IAnalyticsListConfig extends IAnalyticsServiceConfig {
    query: object;
    tableFormat: ITableFormat[];
    hideDatePicker?: boolean;
}
