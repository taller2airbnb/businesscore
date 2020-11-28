const ApiResponse = require('../Response.js');

class SuccessfulApiResponse extends ApiResponse {
    static defaultResponse() {
        throw new Error("You have to implement the method");
    }

    static understandThis(status) {
        return status >= 200 && status < 300;
    }

    constructor(jsonResponse) {
        super(jsonResponse);
        this._jsonResponse = jsonResponse;
    }

    statusCode() {
        return 200;
    }

    hasError() {
        return false;
    }

    getMessage() {
        return this._jsonResponse;
    }

    statusCode() {
        return this._statusCode;
    }

    static hasError() {
        return false
    }


    hasBodyMessage() {
        return true;
    }

}

module.exports = SuccessfulApiResponse