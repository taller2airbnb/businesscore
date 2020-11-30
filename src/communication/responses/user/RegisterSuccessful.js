const SuccessfulApiResponse = require("../generalResponses/SuccessfulApiResponse.js");
("use strict");

module.exports = class RegisterSuccessful extends SuccessfulApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }
  
  constructor(result) {
    super(result[0]);
    this._jsonResponse = result[0];
    this._statusCode = result[1];
  }

};
