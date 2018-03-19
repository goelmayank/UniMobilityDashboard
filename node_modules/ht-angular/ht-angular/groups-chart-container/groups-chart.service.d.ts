import { Observable } from "rxjs/Observable";
import { HtGroupsService } from "../ht/ht-groups.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IGroup } from "ht-models";
import { Subscription } from "rxjs/Subscription";
import { Page } from "ht-models";
export declare class GroupsChartService {
    private groupsService;
    error: any;
    selectedGroups$: BehaviorSubject<Array<IGroup | null>>;
    groupsLevelsEntity$: BehaviorSubject<IGroupsLevelEntity>;
    groupsLevels$: Observable<any[]>;
    groupsSub: Subscription;
    constructor(groupsService: HtGroupsService);
    setRootGroupId(groupId: string | null): void;
    setSelectedGroup(group: IGroup | null, level: number): void;
    setGroupsLevels(): boolean;
    getGroups(parentId: string | null): Observable<Page<IGroup>>;
    setLevel(level: number): void;
}
export interface IGroupsLevelEntity {
    [groupId: string]: IGroup[];
}
