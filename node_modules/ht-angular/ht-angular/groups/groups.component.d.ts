import { OnInit } from '@angular/core';
import { IGroup } from "ht-models";
export declare class GroupsComponent implements OnInit {
    groups: IGroup[];
    groupIdParam: string;
    constructor();
    ngOnInit(): void;
}
