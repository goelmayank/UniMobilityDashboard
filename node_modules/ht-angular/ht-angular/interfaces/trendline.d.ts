import { IDateRange } from "ht-models";
export interface IChartFormat {
    title: string;
    selector(data: any): number;
}
export interface IActionsTrendlineConfig {
    initialDateRange?: IDateRange;
    title: string;
    chartFormat: IChartFormat[];
    tags?: string[];
}
