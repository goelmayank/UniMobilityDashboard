import { EventEmitter, OnInit } from '@angular/core';
export declare class AnalyticsTagsComponent implements OnInit {
    tags: string[];
    selectedTags: string[];
    remove: EventEmitter<{}>;
    selectTag: EventEmitter<{}>;
    edit: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    isTagActive(tag: any): boolean;
}
