import { OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
export declare class AnalyticsItemLoadComponent implements OnInit {
    loading$: Observable<boolean>;
    minHeight: number;
    noData: boolean;
    constructor();
    readonly _minHeight: number;
    ngOnInit(): void;
}
