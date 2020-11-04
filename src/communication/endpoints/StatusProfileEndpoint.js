const Endpoint  = require("./Endpoint.js");
("use strict");

module.exports = class StatusProfileEndpoint extends Endpoint {
  static url() {
    return "/health";
  }

  method() {
    return "GET";
  }

  needsAuthorization() {
    return false;
  }
};
