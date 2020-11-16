const Endpoint  = require("./Endpoint.js");
("use strict");

module.exports = class RegisterAdminEndpoint extends Endpoint {
  static url() {
    return "/register_admin/";
  }

  method() {
    return "POST";
  }

  needsAuthorization() {
    return false;
  }
};
