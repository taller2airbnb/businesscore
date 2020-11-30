const ApiResponse = require("../Response.js");
("use strict");

module.exports = class ErrorApiResponse extends ApiResponse {
  static defaultResponse() {
    throw new Error("You have to implement the method");
  }

  constructor(jsonResponse, _statusCode) {
    super(jsonResponse, _statusCode);
  }

  static statusCode() {
    return 400;
  }

  static isError() {
    return true;
}

getMessage() {
  return this._jsonResponse;
}


};
