const Endpoint = require("./Endpoint.js");
const ChangePasswordSuccessful = require("../responses/user/ChangePasswordSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

module.exports = class ChangePasswordEndpoint extends Endpoint {

    constructor(user_mail) {
        super();
        this._user_mail = user_mail;
      }
      
      url() {
        return "/user/" +  this._user_mail + "/password/";
      }
    

    ownResponses() {
        return [ChangePasswordSuccessful, InvalidCredentials];
    }

    method() {
        return 'PUT'
    }

    needsAuthorization() {
        return true;
    }
}