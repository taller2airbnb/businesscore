const Endpoint  = require("./Endpoint.js");
const StatusSuccessful = require("../responses/status/StatusSuccessful");
("use strict");

module.exports = class StatusProfileEndpoint extends Endpoint {
  static url() {
    return "/health";
  }

  ownResponses() {
      return [StatusSuccessful];
  }

  method() {
    return "GET";
  }

  needsAuthorization() {
    return false;
  }
};
