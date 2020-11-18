module.exports.handlerResponse = function (response) {
  resp = {};
  resp["message"] = response.getMessage();
  resp["status"] = response.statusCode();
  return resp;
};
