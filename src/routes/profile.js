const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());
var validToken = require("./tokenController.js");

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

/**
 * @swagger
 * /profile:
 *   post:
 *     tags:
 *       - profile
 *     description: New profile
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: name profile.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AddProfile'
 *     responses:
 *       200:
 *         description: Successfully add porfile
 *       500:
 *         description: Server error
 */
router.post("/profile", (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
  futureResponse = apiClient.addProfile(
    req.body,
    handlerResponse.handlerResponse
  );
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
  });
});


/**
 * @swagger
 * /profile:
 *   get:
 *      tags:
 *       - profile
 *      description: get profile
 *      security:
 *       - bearerAuth: []
 *      responses:
 *          '200':
 *           description:  OK
 */
router.get("/profile", async (req, res) => {
    if (!validToken.validToken(req, res)) return;
    futureResponse = apiClient.getProfile(handlerResponse.handlerResponse);
      futureResponse.then((result) => {
        res.status(result["status"]).send(result);
      });
  });

module.exports = router;
