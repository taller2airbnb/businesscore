const ErrorApiResponse = require("../generalResponses/ErrorApiResponse");
("use strict");

module.exports = class InvalidCredentials extends ErrorApiResponse {
  static defaultResponse() {
    return {
      error: "Missing password",
    };
  }

  static errorCodes() {
    return ["user not found", "Missing email or username", "Missing password"];
  }

  static getMessage() {
    return "Invalid credential: user not found or Missing email or username  or Missing password";
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
