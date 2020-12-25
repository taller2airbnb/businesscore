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


/**
 * @swagger
 * /intentBooking:
 *   post:
 *     tags:
 *       - booking
 *     description: Intent booking a room (YYYY-MM-DD HH24:MI:SS)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: New Intent Booking
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/intentBooking'
 *     responses:
 *       200:
 *         description: Successfully intent booking a room
 *       500:
 *         description: Server error
 */
router.post("/intentBooking", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);
  // roomId es la transaccion hash
  try {


    //TODO: validar contra que el profile server que es un perfil del tipo que puede hacer reservas
    //TODO: validacion que la fecha no esta ocupada, o sea revisar en la tabla booking
    const { get_creator_id } = (await dao.execSql("get_creator_id", [tokenDecode.payload.id]))[0];
    const { get_transaction_hash_room } = (await dao.execSql("get_transaction_hash_room", [req.body.idPosting]))[0];

    let  initialDate = new Date(req.body.initialDate);
    let  lastDate = new Date(req.body.lastDate);

    body = {};
    body["transaction_hash"] = get_transaction_hash_room;
    body["creatorId"] = get_creator_id;
    body["initialDay"] = initialDate.getDate();
    body["initialMonth"] = initialDate.getMonth() + 1;
    body["initialYear"] = initialDate.getFullYear();
    body["lastDay"] = lastDate.getDate();
    body["lastMonth"] = lastDate.getMonth() + 1;
    body["lastYear"] = lastDate.getFullYear();

    const messageSmartContract = await apiClientSC.intentBooking(body, handlerResponse.handlerResponse)
    //TODO VER QUE HACER CUANDO LLEGO ACA
    res.status(200).send({ message: messageSmartContract, status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "SmartContract create room failed: " + error, status: 500, error: true });
  };
});

module.exports = router;
