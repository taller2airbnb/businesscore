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
const getSettingProfile = require("../../settings.js");


const remoteApiUrlSC = getSettingSC.getSettingSC("API_URL");
const requesterSC = new RemoteRequester(remoteApiUrlSC);
const apiClientSC = new ApiClient(requesterSC);


const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);


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
  try {


    //TODO: validar contra que el profile server que es un perfil del tipo que puede hacer reservas
    //TODO: validar que no sea el mismo tipo que creo la room
    const { booking_date_range_available } = (await dao.execSql("booking_date_range_available", [req.body.initialDate, req.body.lastDate, req.body.idPosting, tokenDecode.payload.id]))[0];
    if (!booking_date_range_available) {
      res.status(400).send({ message: "Dates not avaible", status: 400, error: true });
      return;
    }

    const { get_creator_id } = (await dao.execSql("get_creator_id", [tokenDecode.payload.id]))[0];
    const { get_transaction_hash_room } = (await dao.execSql("get_transaction_hash_room", [req.body.idPosting]))[0];

    let initialDate = new Date(req.body.initialDate);
    let lastDate = new Date(req.body.lastDate);

    body = {};
    //TODO: ojo revisar los days, que vienen defasados en algunos casos
    body["transaction_hash"] = get_transaction_hash_room;
    body["creatorId"] = get_creator_id;
    body["initialDay"] = initialDate.getDate();
    body["initialMonth"] = initialDate.getMonth() + 1;
    body["initialYear"] = initialDate.getFullYear();
    body["lastDay"] = lastDate.getDate();
    body["lastMonth"] = lastDate.getMonth() + 1;
    body["lastYear"] = lastDate.getFullYear();

    const messageBooking = await apiClientSC.intentBooking(body, handlerResponse.handlerResponse)

    if (messageBooking.error) {
      res.status(messageBooking.status).send(messageBooking);
      return;
    }


    const infoDBCreateBooking = await dao.execSql("create_booking", [
      "INTENT_BOOKING",
      req.body.initialDate,
      req.body.lastDate,
      messageBooking.message.bookingTransactionHash,
      tokenDecode.payload.id,
      req.body.idPosting
    ]);

    res.status(200).send({ message: infoDBCreateBooking[0], status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "SmartContract create booking failed: " + error, status: 500, error: true });
  };
});


/**
 * @swagger
 * /myOffers:
 *    get:
 *     tags:
 *       - booking
 *     description: get offers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/myOffers", async (req, res) => {
  try {
    if (!validToken.validToken(req, res)) return;
    let tokenDecode = decodeToken.decodeToken(req);
    let myOffers = await dao.execSql("my_offers", [tokenDecode.payload.id]);

    await Promise.all(myOffers.map(async infoBooking => {
      let { message } = await apiClient.getUser(infoBooking.booker, handlerResponse.handlerResponse);
      infoBooking["first_name_booker"] = message.first_name;
      infoBooking["last_name_booker"] = message.last_name;
      infoBooking["alias_booker"] = message.alias;
    }));

    res.status(200).send({ message: myOffers, status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Get my offers failed: " + error, status: 500, error: true });
  };
});

/**
 * @swagger
 * /acceptBooking:
 *   post:
 *     tags:
 *       - booking
 *     description: Accept a Booking 
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: transactionHash
 *         description:  Accept a Booking
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AcceptBooking'
 *     responses:
 *       200:
 *         description: Successfully intent booking a room
 *       500:
 *         description: Server error
 */
router.post("/acceptBooking", async (req, res) => {
  if (!validToken.validToken(req, res)) return;

  try {
    let requestAcceptBooking = (await dao.execSql("get_request_accept_booking", [req.body.transactionHash]))[0];
    requestAcceptBooking["transaction_booking"] = req.body.transactionHash;
    const acceptBooking = await apiClientSC.acceptBooking(requestAcceptBooking, handlerResponse.handlerResponse)
    if (acceptBooking.error) {
      res.status(acceptBooking.status).send(acceptBooking);
      return;
    }

    res.status(200).send({ message: acceptBooking, status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "SmartContract accept booking failed: " + error, status: 500, error: true });
  };
});

module.exports = router;
