export class HtToken {
    _token: string;
    _tempToken: string;
    _groupToken: string;

    constructor(token: string = "") {
        this.token = token;
    }

    set token(token) {
        this._token = token;
    }

    get token() {
        return this._token;
    }

    set tempToken(token) {
        this._groupToken = "";
        this._tempToken = token;
    }

    get tempToken() {
        return this._tempToken;
    }

    set groupToken(token) {
        this._groupToken = token;
    }

    get groupToken() {
        return this._groupToken;
    }

    get currentToken() {
        return this.groupToken || this.tempToken || this.token;
    }
}
