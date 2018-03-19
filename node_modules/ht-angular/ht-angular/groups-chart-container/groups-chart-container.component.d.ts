import { EventEmitter, OnInit } from '@angular/core';
import { IGroup } from "ht-models";
import { GroupsChartService } from "./groups-chart.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
export declare class GroupsChartContainerComponent implements OnInit {
    groupsChartService: GroupsChartService;
    loading: boolean;
    groupId: string;
    onGroup: EventEmitter<IGroup>;
    constructor(groupsChartService: GroupsChartService);
    ngOnInit(): void;
    readonly selectedGroups$: BehaviorSubject<Array<IGroup | null>>;
    readonly groupsLevels$: Observable<any[]>;
    setGroup(group: any): void;
    selectGroup(group: any, level: any, event: any): void;
}
