const ErrorApiResponse = require("../generalResponses/ErrorApiResponse");
("use strict");

module.exports = class InvalidCredentials extends ErrorApiResponse {
  static defaultResponse() {
    return {
      error: "Missing password",
    };
  }

  constructor(result) {
    super(result[0], result[1]);
  }
  
  static getMessage() {
    return "Invalid data to login";
  }

};
