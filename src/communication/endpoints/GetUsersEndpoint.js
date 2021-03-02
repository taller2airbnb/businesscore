const Endpoint = require("./Endpoint.js");
const GetUserSuccessful = require("../responses/user/GetUserSuccessful");
const InvalidGetUser = require("../responses/user/InvalidGetUser");

("use strict");

module.exports = class GetUsersEndpoint extends Endpoint {

  constructor() {
    super();
  }
  
  url() {
    return "/user/";
  }

  method() {
    return "GET";
  }

  needsAuthorization() {
    return true;
  }

  ownResponses() {
    return [GetUserSuccessful, InvalidGetUser];
}
};
