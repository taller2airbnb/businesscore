const ApiResponse = require("../Response.js");
("use strict");

module.exports = class ErrorApiResponse extends ApiResponse {
  static defaultResponse() {
    throw new Error("You have to implement the method");
  }

  static errorCodes() {
    throw new Error("You have to implement the method");
  }

  errorMessages() {
    return this.errors();
  }

  description() {
    return "¡Ha ocurrido un error!";
  }



  message() {
    return this.errorMessages();
  }

  statusCode() {
    return 400;
  }

  hasError() {
    return true;
  }

  getMessage() {
    return this._jsonResponse;
  }

  statusCode() {
    return this._statusCode;
  }

  static understandThis(status) {
    return (status == 400 || status == 403 || status == 404 || status == 409 || status == 401);
  }

  static hasError() {
    return true
  }

  static statusCode() {
    return 400;
  }

  hasBodyMessage() {
    return true;
  }

  static hasBodyMessage() {
    return false;
  }
};
