import { EventEmitter, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
export declare class EntitySearchComponent implements OnInit {
    query$: Subject<string>;
    loading: any;
    input: any;
    entity: string;
    onSearchQuery: EventEmitter<object>;
    clickSearch(e: any): void;
    constructor();
    ngOnInit(): void;
    test(string: any): void;
    setSearch(el: any): void;
}
