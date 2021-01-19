const SuccessfulApiResponse  = require('../responses/generalResponses/SuccessfulApiResponse.js');

"use strict";

module.exports = class Endpoint {
  static url() {
    throw new Error("You have to implement the method");
  }

  generalResponses() {
    return [SuccessfulApiResponse];
  }

  ownResponses() {
    /*
            Override this in order to provide custom responses
        "*/
    return [];
  }

  responses() {
    /*
            Own responses have more precedence over the general responses
        "*/
    return this.ownResponses().concat(this.generalResponses());
  }

  url() {
    return this.constructor.url();
  }

  contentType() {
    return "application/json";
  }

  method() {
    throw new Error("You have to implement the method");
  }

  needsAuthorization() {
    return false;
  }
}
