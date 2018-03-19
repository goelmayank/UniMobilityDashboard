import {HtBaseApi} from "./base";
import {Observable} from "rxjs/Observable";
import {IAction, ITrackAction, Page} from "ht-models";
import {map} from "rxjs/operators";

export class HtTrackingApi extends HtBaseApi {
    name = "Tracking";
    trackType = {
        shortCode: "short_code",
        lookupId: 'lookup_id',
        collectionId: 'collection_id',
        actionId: 'id'
    };

    constructor(request) {
        super(request, "actions");
    }

    track(id: string, idType: 'shortCode' | 'lookupId' | 'collectionId' | 'actionId' = 'shortCode', token?: string): Observable<IAction[]> {
        let trackKey = this.trackType[idType];
        if(trackKey) {
            const query = {[trackKey]: id};
            const path = `${this.base}/track/`;
            return this.api$(path, query, {token}).pipe(
                map((data: Page<ITrackAction>) => {
                    let actions: IAction[] = [];
                    data.results.forEach((result: ITrackAction) => {
                        let actionsWithAccount = result.actions.map((action: IAction) => {
                            return {
                                ...action,
                                account: result.account
                            };
                        });
                        actions.push(...actionsWithAccount);
                    });
                    return actions;
                })
            );
        } else {
            console.error('Invalid Tracking type ' + idType)
        }

    }
}