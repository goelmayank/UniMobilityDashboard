import { OnInit } from '@angular/core';
import { IUsersSummaryData } from "ht-client";
export declare class UsersSummaryChartComponent implements OnInit {
    service: any;
    noData: boolean;
    chart: any;
    summary$: any;
    charElem: any;
    constructor();
    ngOnInit(): void;
    setChart(data: any): boolean;
    formatSummary(data: IUsersSummaryData): {
        labels: string[];
        datasets: {
            values: number[];
        }[];
    };
}
