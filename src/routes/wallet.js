const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());
const dao = require("../db/index");
var validToken = require("./tokenController.js");
var decodeToken = require("./tokenController.js");
const RemoteRequester = require("../communication/requester/RemoteRequester");
const ApiClient = require("../communication/client/ApiClient");
const getSettingSC = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");

const remoteApiUrlSC = getSettingSC.getSettingSC("API_URL");
const requesterSC = new RemoteRequester(remoteApiUrlSC);
const apiClientSC = new ApiClient(requesterSC);
const { logger } = require("../config/logger.js");

/**
 * @swagger
 * /wallet:
 *   get:
 *     tags:
 *       - wallet
 *     description: get wallet address
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully get wallet address
 *       500:
 *         description: Server error
 */
router.get("/wallet", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);
  try {

    const { get_creator_id } = (await dao.execSql("get_creator_id", [tokenDecode.payload.id]))[0];
    const messageWallet = await apiClientSC.getWallet(get_creator_id, handlerResponse.handlerResponse)
    res.status(messageWallet.status).send(messageWallet);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: messageWallet});
  } catch (error) {
    res
      .status(500)
      .send({ message: "SmartContract get wallet address: " + error, status: 500, error: true });
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
  };
});

module.exports = router;
