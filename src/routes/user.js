const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");

const { Router } = require("express");
const router = Router();
var request = require("request");
var cors = require("cors");
const bodyParser = require("body-parser");

router.get("/profile-status", (req, res, next) => {
  request.get(
    "https://taller2airbnb-profile.herokuapp.com/health",
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      res.send(JSON.parse(body));
    }
  );
});

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

router.get("/profile-register2", (req, res, next) => {
  console.log("entro al registrer 2");
  futureResponse = apiClient.statusProfile(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
  });
});

/**
 * @swagger
 * /profile-register:
 *   post:
 *     tags:
 *       - profile-register
 *     description: User registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Username to use for login.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Registration'
 *     responses:
 *       200:
 *         description: Successfully added
 *       500:
 *         description: Server error
 */
router.post("/profile-register", (req, res, next) => {
  futureResponse = apiClient.register(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
  });
});

module.exports = router;
