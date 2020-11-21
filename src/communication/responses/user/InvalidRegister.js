const ErrorApiResponse = require("../generalResponses/ErrorApiResponse.js");
("use strict");

module.exports = class InvalidRegister extends ErrorApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  constructor(jsonResponse) {
    super(jsonResponse);
    this._jsonResponse = jsonResponse;
  }

  static getMessage() {
    return "Invalid data to registration";
  }

  static understandThis(status) {
    return status == 400;
  }

  static hasError(){
    return true
  }

  static statusCode(){
    return 400;
  }
};
