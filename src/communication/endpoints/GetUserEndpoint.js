const Endpoint = require("./Endpoint.js");
const GetUserSuccessful = require("../responses/user/GetUserSuccessful");
const InvalidGetUser = require("../responses/user/InvalidGetUser");

("use strict");

module.exports = class GetUserEndpoint extends Endpoint {

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
    return [GetUserSuccessful, InvalidGetUser];
}
};
