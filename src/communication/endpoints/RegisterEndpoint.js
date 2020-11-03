const Endpoint  = require("./Endpoint.js");
("use strict");

module.exports = class RegisterEndpoint extends Endpoint {
  static url() {
    return "/register/";
  }

  method() {
    return "POST";
  }

  needsAuthorization() {
    return false;
  }
};
