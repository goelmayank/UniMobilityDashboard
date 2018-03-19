import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
export declare class ActionsStatusGraphComponent implements OnInit, AfterViewInit, OnDestroy {
    service: any;
    data: any;
    chart: any;
    noData: boolean;
    charElem: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    setChart(data: any): boolean;
    ngOnDestroy(): void;
}
