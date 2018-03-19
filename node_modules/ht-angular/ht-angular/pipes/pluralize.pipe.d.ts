import { PipeTransform } from '@angular/core';
export declare class PluralizePipe implements PipeTransform {
    transform(value: string, args: number, suffix?: string, singularSuffix?: string): any;
}
