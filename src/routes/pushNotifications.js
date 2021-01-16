const { Expo } = require("expo-server-sdk");

const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const getSettingSC = require("../../settings.js");
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
 *         description: Update push token
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
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      throw "error valid PushToken";
    };

    let messages = [];

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: userResponse.message.push_token,
      sound: "default",
      body: req.body.content,
      data: { withSome: "data" },
    });

    let chunks = expo.chunkPushNotifications(messages);
    res.status(200).send({ message: chunks, status: 200, error: false });
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
