import {HtRequest} from "../core/request";

export const htRequestService = (() => {
    var instance: HtRequest;

    return {
        getInstance(token?) {
            if (!instance) {
                instance = new HtRequest(token);
            }
            return instance;
        },
        setInstance(newintance: HtRequest) {
            if (instance) {
                const tokenService = instance.tokenServie;
                newintance.tokenServie = tokenService;
            }
            instance = newintance;
        }
    };
})();