const ErrorApiResponse = require("../generalResponses/ErrorApiResponse.js");
("use strict");

module.exports = class InvalidNewGetProfile extends ErrorApiResponse {

  constructor(result) {
    super(result[0], result[1]);
  }

  
  static getMessage() {
    return "Invalid data profile";
  }

  static understandThis(status) {
    return status == 400;
  }

};
