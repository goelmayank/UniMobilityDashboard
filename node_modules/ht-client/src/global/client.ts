import {htRequestService} from "ht-api";

export class HtClient {
  constructor(token: string = "", request) {
    htRequestService.setInstance(request);
    this.token = token;
  }

  set token(token) {
      htRequestService.getInstance().tokenServie.token = token
  }

  set tempToken(token) {
      htRequestService.getInstance().tokenServie.tempToken = token
  }
}

export const initClient = (token, request) => {
  return htClientService.getInstance(token, request);
};

export const htClientFactory = (token, request) => {
  return new HtClient(token, request);
};

export const htClientService = (() => {
  var instance: HtClient;

  return {
    getInstance(token = "", request) {
      if (!instance) {
        instance = htClientFactory(token, request);
      }
      return instance;
    }
  };
})();
