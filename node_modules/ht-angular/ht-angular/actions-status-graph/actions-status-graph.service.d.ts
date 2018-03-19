import { IActionsTrendlineConfig } from "../interfaces/trendline";
import { ActionsGraph } from "ht-client";
import { ActionsStatusGraphComponent } from "./actions-status-graph.component";
import { IAnalyticsService } from "../interfaces/analytics";
export declare class ActionsStatusGraphService implements IAnalyticsService {
    component: typeof ActionsStatusGraphComponent;
    client: ActionsGraph;
    dateRangeService$: any;
    data$: any;
    title: any;
    chartFormat: any;
    tags: string[];
    className: string;
    noData: any;
    loading$: any;
    constructor(config: IActionsTrendlineConfig);
    initState(config: IActionsTrendlineConfig): void;
    private initClient();
    private getCompletedActionChart(data);
    setData(instance: ActionsStatusGraphComponent): void;
    setActive(isActive?: boolean): void;
}
