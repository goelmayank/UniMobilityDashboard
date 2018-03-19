import { OnInit } from '@angular/core';
import { IAnalyticsList } from "../interfaces/analytics-list";
import { IAction } from "ht-models";
export declare class ActionsAnalyticsListComponent implements OnInit {
    listService: IAnalyticsList;
    selectedAction: IAction | null;
    constructor();
    ngOnInit(): void;
    showActionDetail(row: any): void;
    closeModal(): void;
}
