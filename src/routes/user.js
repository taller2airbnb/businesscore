const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());


const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

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
