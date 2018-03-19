import { ActionsSummaryChartComponent } from "./actions-summary-chart.component";
import { ISummaryConfig } from "../interfaces/users-analytics";
import { HtActionsClient } from "ht-client";
import { IAnalyticsService } from "../interfaces/analytics";
export declare class ActionsSummaryService implements IAnalyticsService {
    component: typeof ActionsSummaryChartComponent;
    className: string;
    tags: string[];
    dateRangeService$: any;
    client: any;
    summary$: any;
    title: any;
    hideDatePicker: boolean;
    noData: boolean;
    loading$: any;
    minHeight: number;
    constructor(config: ISummaryConfig<HtActionsClient>);
    setData(instance: ActionsSummaryChartComponent): void;
    private initState(config);
    setActive(isActive?: boolean): void;
}
