const Endpoint = require("./Endpoint.js");
const RegisterSuccessful = require("../responses/user/RegisterSuccessful");
const InvalidRegister = require("../responses/user/InvalidRegister");

("use strict");

module.exports = class RegisterAdminEndpoint extends Endpoint {

  constructor(userId) {
    super();
    this._userId = userId;
  }
  
  url() {
    return "/user/" + this._userId;
  }

  method() {
    return "GET";
  }

  needsAuthorization() {
    return false;
  }

  ownResponses() {
    return [RegisterSuccessful, InvalidRegister];
}
};
