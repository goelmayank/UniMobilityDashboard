import { IAnalyticsListConfig } from "../../interfaces/analytics-list";
import { ISummaryConfig } from "../../interfaces/users-analytics";
import { IActionsTrendlineConfig } from "../../interfaces/trendline";
export interface IPreset {
    service: any;
    initialConfig: IAnalyticsListConfig | ISummaryConfig<any> | IActionsTrendlineConfig;
}
export interface IAnalyticsPresets {
    [name: string]: (...args: any[]) => IPreset;
}
export declare const usersAnalyticsListPresets: IAnalyticsPresets;
