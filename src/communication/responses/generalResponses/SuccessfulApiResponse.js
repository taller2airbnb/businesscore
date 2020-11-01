const { ApiResponse } = require('../Response.js');

"use strict";

class SuccessfulApiResponse extends ApiResponse {
    static defaultResponse() {
        throw new Error("You have to implement the method");
    }

    static understandThis(jsonResponse) {
        return jsonResponse.error === undefined;
    }
}

module.exports = {
    SuccessfulApiResponse : Dalmatian, //export this class
    Dog: Dog // and export parent class too!
  }