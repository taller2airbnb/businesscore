const { Expo } = require("expo-server-sdk");

const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const getSettingNT = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const { Router } = require("express");
const router = Router();
const dao = require("../db/index");
var cors = require("cors");
router.use(cors());
router.options("*", cors());
var validToken = require("./tokenController.js");
var decodeToken = require("./tokenController.js");
var jwt = require("jsonwebtoken");

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

const remoteApiUrlNT = getSettingNT.getSettingNT("API_URL");
const requesterNT = new RemoteRequester(remoteApiUrlNT);
const apiClientNT = new ApiClient(requesterNT);




let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

/**
 * @swagger
 * /notification:
 *   post:
 *     tags:
 *       - notification
 *     description: send notification
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idUser
 *         description: Id user.
 *         in: query
 *         required: true
 *       - name: body
 *         description: Content notification
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PushNotification' 
 
 *     responses:
 *       200:
 *         description: Successfully notification
 *       500:
 *         description: Server error
 */
router.post("/notification", async (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
//ExponentPushToken[Vn3OG1PFhy8uISd4vLBRD9]
  try {
    let userResponse = await apiClient.getUser(
      req.query.idUser,
      handlerResponse.handlerResponse
    );

    if (!Expo.isExpoPushToken(userResponse.message.push_token)) {
      console.error(`Push token ${userResponse.message.push_token} is not a valid Expo push token`);
      throw "error valid PushToken";
    };

    let requestNotification = {}
    requestNotification["to"] = userResponse.message.push_token;
    requestNotification["title"] = req.body.title;
    requestNotification["body"] = req.body.body;

    let notificationReponse = await apiClientNT.sendNotification(requestNotification, handlerResponse.handlerResponse);
    res.status(200).send(notificationReponse);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error: " + error, status: 500, error: true });
  }
});

/**
 * @swagger
 * /pushToken:
 *   put:
 *     tags:
 *       - notification
 *     description: send notification
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idUser
 *         description: Id user.
 *         in: query
 *         required: true
 *       - name: body
 *         description: Update push token
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChangePushToken'
 *     responses:
 *       200:
 *         description: Successfully change PushToken
 *       500:
 *         description: Server error
 */
router.put("/pushToken", async (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
  try {
    let pushToken = await apiClient.putPushToken(
      req.query.idUser,
      req.body,
      handlerResponse.handlerResponse
    );

    res.status(200).send(pushToken);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error: " + error, status: 500, error: true });
  }
});

module.exports = router;
