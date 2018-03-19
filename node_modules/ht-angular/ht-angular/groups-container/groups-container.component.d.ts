import { OnInit } from '@angular/core';
import { HtGroupsService } from "../ht/ht-groups.service";
export declare class GroupsContainerComponent implements OnInit {
    private groupsClient;
    groups$: any;
    groupIdParam: string;
    constructor(groupsClient: HtGroupsService);
    ngOnInit(): void;
}
