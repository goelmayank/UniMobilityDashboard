import { EventEmitter, OnInit } from '@angular/core';
export declare class UsersSummaryComponent implements OnInit {
    setQuery: EventEmitter<object>;
    clearQueryKey: EventEmitter<string>;
    summary: any;
    hideTotal: any;
    selectable: boolean;
    hoveredQuery: any;
    constructor();
    ngOnInit(): void;
    onHoverQuery(query: any): void;
    onHoveroutQuery(): void;
    indexId(index: any, item: any): any;
    setFilter(datum: any): void;
    clearFilter(datum: any): void;
    selectLabel(datum: any): boolean;
}
