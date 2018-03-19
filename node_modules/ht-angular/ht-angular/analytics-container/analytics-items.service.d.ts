import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { IAnalyticsService } from "../interfaces/analytics";
export declare class AnalyticsItemsService {
    presets: any;
    chosenItemCreater: any[];
    items$: BehaviorSubject<IAnalyticsService[]>;
    filteredItems$: Observable<IAnalyticsService[]>;
    allTags$: Observable<string[]>;
    tags$: Observable<ISelectedTag[]>;
    selectedTags$: BehaviorSubject<string[]>;
    totalTags: number;
    constructor();
    initPresets(): void;
    private isItemCreatorActive(itemCreator);
    toggleTag(tag: string): void;
    selectTag(tag: string): void;
    setPreset(choosenPreset: any): void;
    getItems(itemsConfigs: any): any;
    initServices(): void;
    private setServicesActive(isActive?);
    destroy(): void;
}
export interface ISelectedTag {
    key: string;
    isActive: boolean;
}
