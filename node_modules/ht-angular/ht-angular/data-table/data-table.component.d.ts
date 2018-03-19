import { EventEmitter, OnInit } from '@angular/core';
export declare class DataTableComponent implements OnInit {
    tableData: any;
    clickable: boolean;
    select: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    selectRow(row: any): void;
}
