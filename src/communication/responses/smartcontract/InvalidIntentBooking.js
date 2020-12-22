const ErrorApiResponse = require("../generalResponses/ErrorApiResponse.js");

module.exports = class InvalidIntentBooking extends (
  ErrorApiResponse
) {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  constructor(result) {
    super(result[0], result[1]);
    this._jsonResponse = result[0];
    this._statusCode = result[1];
  }

  static getMessage() {
    return "Invalid intent booking";
  }

  static understandThis(status) {
    return (
      status == 400 ||
      status == 403 ||
      status == 404 ||
      status == 409 ||
      status == 401 ||
      status == 402
    );
  }
};
