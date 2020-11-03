const  ApiResponse = require('../Response.js');

class SuccessfulApiResponse extends ApiResponse {
    static defaultResponse() {
        throw new Error("You have to implement the method");
    }

    static understandThis(jsonResponse) {
        return jsonResponse.error === undefined;
    }
}

module.exports = SuccessfulApiResponse