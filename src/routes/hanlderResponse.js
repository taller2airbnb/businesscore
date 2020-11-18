module.exports.handlerResponse = async function (response) {
  resp = {};
  resp["message"] = response.getMessage();
  resp["status"] = response.statusCode();
  if (!response.hasError())
    resp["json"] = await response.getJson();
  return resp;
};
