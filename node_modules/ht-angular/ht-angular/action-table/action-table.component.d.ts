import { OnInit } from '@angular/core';
import { IAction } from "ht-models";
export declare class ActionTableComponent implements OnInit {
    action: IAction;
    excludedKey: string[];
    constructor();
    ngOnInit(): void;
    readonly tableData: any[];
}
