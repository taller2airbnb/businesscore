const Endpoint = require("./Endpoint.js");
const RegisterSuccessful = require("../responses/user/RegisterSuccessful");
const InvalidRegister = require("../responses/user/InvalidRegister");

("use strict");

module.exports = class RegisterAdminEndpoint extends Endpoint {
  static url() {
    return "/user/";
  }

  method() {
    return "POST";
  }

  needsAuthorization() {
    return true;
  }

  ownResponses() {
    return [RegisterSuccessful, InvalidRegister];
}
};
