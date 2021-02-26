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
const getSettingNT = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const getSettingProfile = require("../../settings.js");

const remoteApiUrlSC = getSettingSC.getSettingSC("API_URL");
const requesterSC = new RemoteRequester(remoteApiUrlSC);
const apiClientSC = new ApiClient(requesterSC);
const BigNumber = require('bignumber.js');

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const apiKeyProfileServer = getSettingProfile.getSettingProfile("API_KEY");
const requester = new RemoteRequester(remoteApiUrl);
requester.setApiKey(apiKeyProfileServer);
const apiClient = new ApiClient(requester);
const { logger } = require("../config/logger.js");
const { re } = require("mathjs");


const remoteApiUrlNT = getSettingNT.getSettingNT("API_URL");
const requesterNT = new RemoteRequester(remoteApiUrlNT);
const apiClientNT =  new ApiClient(requesterNT);


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
    const { booking_date_range_available } = (await dao.execSql("booking_date_range_available", [req.body.initialDate, req.body.lastDate, req.body.idPosting, tokenDecode.payload.id]))[0];
    if (!booking_date_range_available) {
      res.status(400).send({ message: "Dates not avaible", status: 400, error: true });
      return;
    }

    const { get_creator_id } = (await dao.execSql("get_creator_id", [tokenDecode.payload.id]))[0];
    const { get_transaction_hash_room } = (await dao.execSql("get_transaction_hash_room", [req.body.idPosting]))[0];
    const [initialYear, initialMonth, initialDay] = req.body.initialDate.split('-');
    const [lastYear, lastMonth, lastDay] = req.body.lastDate.split('-');

    body = {};
    body["transaction_hash"] = get_transaction_hash_room;
    body["creatorId"] = parseInt(get_creator_id);
    body["initialDay"] = parseInt(initialDay);
    body["initialMonth"] = parseInt(initialMonth);
    body["initialYear"] = parseInt(initialYear);
    body["lastDay"] = parseInt(lastDay);
    body["lastMonth"] = parseInt(lastMonth);
    body["lastYear"] = parseInt(lastYear);

    //send notification to host
    try {
      const posting = (await dao.execSql("get_posting", [req.body.idPosting]))[0];
      let userResponse = await apiClient.getUser(
        posting.id_user,
        handlerResponse.handlerResponse
      );
      let requestNotification = {}
      requestNotification["to"] = userResponse.message.push_token;
      requestNotification["title"] = "Intent Booking:" + posting.name;
      requestNotification["body"] = "Dates: " + req.body.initialDate
        + " to " + req.body.lastDate + " from " + tokenDecode.payload.username;
      if (userResponse.message.push_token != null) {
        apiClientNT.sendNotification(requestNotification, handlerResponse.handlerResponse);
      } else {
        logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: "Fail notification:" + requestNotification });
      }
    } catch (error) {
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error});
    }

    const messageBooking = await apiClientSC.intentBooking(body, handlerResponse.handlerResponse);
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

    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: infoDBCreateBooking[0] });
    res.status(200).send({ message: infoDBCreateBooking[0], status: 200, error: false });
  } catch (error) {
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
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
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'info', message: myOffers});
  } catch (error) {
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'error', message: error.message});
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
 *         description: Successfully accept booking a room
 *       500:
 *         description: Server error
 */
router.post("/acceptBooking", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);
  try {
    let requestAcceptBooking = (await dao.execSql("get_request_accept_or_reject_booking", [req.body.transactionHash]))[0];
    requestAcceptBooking["transaction_booking_intent"] = req.body.transactionHash;
    const acceptBooking = await apiClientSC.acceptBooking(requestAcceptBooking, handlerResponse.handlerResponse);
    if (acceptBooking.error) {
      res.status(acceptBooking.status).send(acceptBooking);
      return;
    }
    await dao.execSql("update_booking", ["ACCEPTED_BOOKING", req.body.transactionHash])
    //send notification to booker
    try {

      const {get_user_id} = (await dao.execSql("get_user_id", [requestAcceptBooking.creator_id_booker]))[0];
      const posting = (await dao.execSql("get_posting_by_hash_room", [requestAcceptBooking.transaction_room]))[0];
      let userResponse = await apiClient.getUser(
        get_user_id,
        handlerResponse.handlerResponse
      );

      let requestNotification = {}
      requestNotification["to"] = userResponse.message.push_token;
      requestNotification["title"] = "Accept Booking:" + posting.name;
      requestNotification["body"] = "Dates: " + requestAcceptBooking.initial_year + "-"
        + requestAcceptBooking.initial_month + "-" + requestAcceptBooking.last_day
        + " to " + requestAcceptBooking.last_year + "-"
        + requestAcceptBooking.last_month + "-" + requestAcceptBooking.last_day + " from " + tokenDecode.payload.username;
      if (userResponse.message.push_token != null) {
        apiClientNT.sendNotification(requestNotification, handlerResponse.handlerResponse);
      } else {
        logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: "Fail notification:" + requestNotification });
      }
    } catch (error) {
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error });
    }


    res.status(200).send({ message: acceptBooking.message, status: 200, error: false });
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'info', message: acceptBooking.message});
  } catch (error) {
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'error', message: error.message});
    res
      .status(500)
      .send({ message: "SmartContract accept booking failed: " + error, status: 500, error: true });
  };
});

/**
 * @swagger
 * /rejectBooking:
 *   post:
 *     tags:
 *       - booking
 *     description: Reject a Booking 
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: transactionHash
 *         description:  Reject a Booking
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RejectBooking'
 *     responses:
 *       200:
 *         description: Successfully reject booking a room
 *       500:
 *         description: Server error
 */
router.post("/rejectBooking", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);

  try {
    let requestRejectBooking = (await dao.execSql("get_request_accept_or_reject_booking", [req.body.transactionHash]))[0];
    requestRejectBooking["transaction_booking_intent"] = req.body.transactionHash;
    const rejectBooking = await apiClientSC.rejectBooking(requestRejectBooking, handlerResponse.handlerResponse)
    if (rejectBooking.error) {
      res.status(rejectBooking.status).send(rejectBooking.message);
      return;
    }
    await dao.execSql("update_booking", ["REJECTED_BOOKING", req.body.transactionHash]);

    try {
      const {get_user_id} = (await dao.execSql("get_user_id", [requestRejectBooking.creator_id_booker]))[0];
      const posting = (await dao.execSql("get_posting_by_hash_room", [requestRejectBooking.transaction_room]))[0];
      let userResponse = await apiClient.getUser(
        get_user_id,
        handlerResponse.handlerResponse
      );
      let requestNotification = {}

      requestNotification["to"] = userResponse.message.push_token;
      requestNotification["title"] = "Reject Booking:" + posting.name;
      requestNotification["body"] = "Dates: " + requestRejectBooking.initial_year + "-"
        + requestRejectBooking.initial_month + "-" + requestRejectBooking.last_day
        + " to " + requestRejectBooking.last_year + "-"
        + requestRejectBooking.last_month + "-" + requestRejectBooking.last_day + " from " + tokenDecode.payload.username;
      if (userResponse.message.push_token != null) {
        apiClientNT.sendNotification(requestNotification, handlerResponse.handlerResponse);
      } else {
        logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: "Fail notification:" + requestNotification });
      }
    } catch (error) {
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error });
    }
    res.status(200).send({ message: rejectBooking.message, status: 200, error: false });
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'info', message: rejectBooking.message});
  } catch (error) {
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'error', message: error.message});
    res
      .status(500)
      .send({ message: "SmartContract accept booking failed: " + error, status: 500, error: true });
  };
});

/**
 * @swagger
 * /myBookingIntents:
 *    get:
 *     tags:
 *       - booking
 *     description: get my booking intents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/myBookingIntents", async (req, res) => {
  try {
    if (!validToken.validToken(req, res)) return;
    let tokenDecode = decodeToken.decodeToken(req);
    let myBookings = await dao.execSql("my_booking_intents", [tokenDecode.payload.id]);

    await Promise.all(myBookings.map(async infoBooking => {
      let { message } = await apiClient.getUser(infoBooking.owner, handlerResponse.handlerResponse);
      infoBooking["first_name_booker"] = message.first_name;
      infoBooking["last_name_booker"] = message.last_name;
      infoBooking["alias_booker"] = message.alias;
    }));

    res.status(200).send({ message: myBookings, status: 200, error: false });
    logger.log({service: req.method + ": "  + req.originalUrl,  level: 'info', message: myBookings});
  } catch (error) {
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'error', message: error.message});
    res
      .status(500)
      .send({ message: "Get my offers failed: " + error, status: 500, error: true });
  };
});


/**
 * @swagger
 * /myBookings:
 *    get:
 *     tags:
 *       - booking
 *     description: get my bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/myBookings", async (req, res) => {
  try {
    if (!validToken.validToken(req, res)) return;
    let tokenDecode = decodeToken.decodeToken(req);
    let myBookings = await dao.execSql("my_bookings", [tokenDecode.payload.id]);

    await Promise.all(myBookings.map(async infoBooking => {
      let { message } = await apiClient.getUser(infoBooking.owner, handlerResponse.handlerResponse);
      infoBooking["first_name_booker"] = message.first_name;
      infoBooking["last_name_booker"] = message.last_name;
      infoBooking["alias_booker"] = message.alias;
    }));

    res.status(200).send({ message: myBookings, status: 200, error: false });
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'info', message: myBookings});
  } catch(error){
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'error', message: error.message});
    res
      .status(500)
      .send({ message: "Get my offers failed: " + error, status: 500, error: true });
  };
});


/**
 * @swagger
 * /transactions:
 *    get:
 *     tags:
 *       - booking
 *     description: get all transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/transactions", async (req, res) => {
  try {
    if (!validToken.validToken(req, res)) return;
    const transactionsResponse = await apiClientSC.transactions({}, handlerResponse.handlerResponse)
    let transactions = transactionsResponse.message.transactions;

    await Promise.all(transactions.map(async infoTransactions => {

      const owner_id = (await dao.execSql("get_user_id", [infoTransactions.creator_id_booker]))[0];
      const booker_id = (await dao.execSql("get_user_id", [infoTransactions.creator_id_booker]))[0];
      const { get_name_posting } = (await dao.execSql("get_name_posting", [infoTransactions.transaction_hash_room]))[0];


      let booker = (await apiClient.getUser(owner_id.get_user_id, handlerResponse.handlerResponse)).message;
      let owner = ( await apiClient.getUser(booker_id.get_user_id, handlerResponse.handlerResponse)).message;

      infoTransactions["name_posting"] = get_name_posting;
      infoTransactions["first_name_booker"] = booker.first_name;
      infoTransactions["last_name_booker"] = booker.last_name;
      infoTransactions["alias_booker"] = booker.alias;

      infoTransactions["first_name_owner"] = owner.first_name;
      infoTransactions["last_name_owner"] = owner.last_name;
      infoTransactions["alias_owner"] = owner.alias;

      const ETHER_IN_ETHER = BigNumber(10).pow(18);
      infoTransactions["payment"]  = BigNumber(infoTransactions["payment"] ).dividedBy(ETHER_IN_ETHER).toFixed();
    }));

    logger.log({service: req.method + ": "  + req.originalUrl, level: 'info', message: transactions});
    res.status(200).send(transactions);
  } catch (error) {
    logger.log({service: req.method + ": "  + req.originalUrl, level: 'error', message: error.message});
    res
      .status(500)
      .send({ message: "Get all transactions failed: " + error, status: 500, error: true });
  };
});

module.exports = router;
