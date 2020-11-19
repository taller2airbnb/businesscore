const Endpoint  = require("./Endpoint.js");
const RegisterSuccessful = require("../responses/user/RegisterSuccessful");
const InvalidUserGetProfile = require("../responses/user/InvalidUserGetProfile");
("use strict");

module.exports = class RegisterEndpoint extends Endpoint {
  static url() {
    return "/register/";
  }

  ownResponses() {
    return [RegisterSuccessful, InvalidUserGetProfile];
}

  method() {
    return "POST";
  }

  needsAuthorization() {
    return false;
  }
};
