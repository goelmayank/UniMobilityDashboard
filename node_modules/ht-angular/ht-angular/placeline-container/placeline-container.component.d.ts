import { OnDestroy, OnInit } from '@angular/core';
import { HtUsersService } from "../ht/ht-users.service";
export declare class PlacelineContainerComponent implements OnInit, OnDestroy {
    private userClientService;
    userId: string | null;
    showUserCard: boolean;
    userData$: any;
    selectedSegmentId$: any;
    constructor(userClientService: HtUsersService);
    ngOnInit(): void;
    onHighlightSegment(segmentId: string): void;
    onSelectSegmentId(segmentId: string | null): void;
    ngOnDestroy(): void;
}
