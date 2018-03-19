import { EventEmitter, OnInit } from '@angular/core';
import { Page } from "ht-models";
export declare class PaginationComponent implements OnInit {
    pageDate: Page<any>;
    pageSize: number;
    fetchPage: EventEmitter<number>;
    constructor();
    ngOnInit(): void;
    readonly currentPage: number;
    readonly pagesCount: number;
    readonly visiblePages: any[];
    onFetchPage(pageNumber: number): void;
}
