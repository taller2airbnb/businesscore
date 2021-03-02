module.exports.handlerResponse = async function (response) {
  resp = {};
  resp["status"] = response.statusCode();
  if (response.hasBodyMessage()) {
    if (response.isError()) resp["message"] = (await response.getMessage())["Error"]
    else resp["message"] = await response.getMessage()
  } else {
    resp["message"] = response.getMessage()
  }
  resp["error"] = response.isError();
  return resp;
};
