const ApiResponse = require('../Response.js');

class SuccessfulApiResponse extends ApiResponse {
    static defaultResponse() {
        throw new Error("You have to implement the method");
    }

    static understandThis(status) {
        return status >= 200 && status < 300;
    }

    constructor(jsonResponse, _statusCode) {
        super(jsonResponse, _statusCode);
    }

    static isError() {
        return false;
    }
}

module.exports = SuccessfulApiResponse