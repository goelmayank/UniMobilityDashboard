import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { IDateRange } from "ht-models";
export interface IDateRangePickerOptions {
    hideSingleDay?: boolean;
    isRight?: boolean;
    datePicker?: boolean;
    hideCalender?: boolean;
}
export interface IDay {
    date: Date;
    timeStamp: string;
    day: string;
    isInMonth: boolean;
    today: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    isHovered?: boolean;
    isInvalid?: boolean;
    isWithinRange?: boolean;
}
export declare class DateRangePickerComponent implements OnInit, OnChanges {
    dateRange: IDateRange;
    date: string;
    options: IDateRangePickerOptions;
    onRangeChange: EventEmitter<IDateRange>;
    onDateChange: EventEmitter<string>;
    currentMonthStart$: BehaviorSubject<Date>;
    dates$: Observable<IDay[][]>;
    selectedDate$: BehaviorSubject<string | null>;
    hoveredDate: BehaviorSubject<string | null>;
    days: string[];
    month$: Observable<{
        display: string;
    }>;
    currentDateStyle$: Observable<IDateStyle>;
    display: string;
    customDates: {
        label: string;
        range: {
            start: any;
            end: any;
        };
        isSingleDay: boolean;
        hasToday: boolean;
    }[];
    customDates$: any[];
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    initDateRange(range: IDateRange): void;
    changeMonth(inc: number): void;
    generateDates(monthStart: Date, dateStyle: IDateStyle): IDay[][];
    getDay(date: Date, monthStart: Date, dateStyle: IDateStyle): IDay;
    isHovered(date: Date, dateStyle: IDateStyle): boolean;
    setDateRange(range: IDateRange): void;
    setDate(date: IDay): void;
    getRangeFromStyle({selectedRange, hoveredDate}: IDateStyle): Partial<IDateRange>;
    pickDate(date: IDay): boolean;
    setDateFromDayRange(date: IDay, dateStyle: IDateStyle): void;
    hoverDate(date: IDay | null): void;
    indexBy(a: any, v: IDay): string;
    indexByWeek(a: any, v: IDay[]): string;
    reset(): void;
}
export interface IDateStyle {
    selectedRange?: Partial<IDateRange>;
    hoveredDate: string | null;
    display?: Array<string | null>;
}
