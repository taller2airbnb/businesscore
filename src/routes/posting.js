const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());
const dao = require("../db/index");
var validToken = require("./tokenController.js");
var decodeToken = require("./tokenController.js");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingSC = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");

const remoteApiUrlSC = getSettingSC.getSettingSC("API_URL");
const requesterSC = new RemoteRequester(remoteApiUrlSC);
const apiClientSC = new ApiClient(requesterSC);

/**
 * @swagger
 * /posting:
 *    get:
 *     tags:
 *       - posting
 *     description: get posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("get_posting", [req.query.idPosting]);
  future
    .then((result) => {
      res.status(200).send({ message: result, status: 200, error: false });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Data base: " + error, status: 500, error: true });
    });
});

/**
 * @swagger
 * /posting:
 *   post:
 *     tags:
 *       - posting
 *     description: New posting (YYYY-MM-DD HH24:MI:SS)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: New Posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PostingAdd'
 *     responses:
 *       200:
 *         description: Successfully new posting
 *       500:
 *         description: Server error
 */
router.post("/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);
  //TODO: validacion precio minimo
  try {
    //TODO: validar contra que el profile server que es un perfil del tipo que crear rooms
    const { get_creator_id } = (await dao.execSql("get_creator_id", [tokenDecode.payload.id]))[0];
    
    body = { creatorId: get_creator_id, price: req.body.price_day };
    const messageSmartContract = await apiClientSC.createRoom(body, handlerResponse.handlerResponse)
    if (messageSmartContract.error){
      res.status(messageSmartContract.status).send(messageSmartContract);
      return;
    }

    const infoDBCreateRoom = await dao.execSql("create_posting", [
      req.body.price_day,
      req.body.start_date,
      req.body.end_date,
      req.body.state,
      req.body.features,
      req.body.public,
      req.body.content,
      tokenDecode.payload.id,
      req.body.name,
      messageSmartContract.message.roomTransactionHash,
      req.body.country,
      req.body.city,
      req.body.max_number_guests,
      req.body.latitude,
      req.body.longitude
    ]);

    res.status(200).send({ message: infoDBCreateRoom[0], status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "SmartContract create room failed: " + error, status: 500, error: true });
  };
});



/**
 * @swagger
 * /posting/{idPosting}:
 *   put:
 *     tags:
 *       - posting
 *     description: New posting (YYYY-MM-DD HH24:MI:SS)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: path
 *         description: idposting
 *         required: true
 *         type: number
 *       - name: body
 *         description: Update Posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PostingPut'
 *     responses:
 *       200:
 *         description: Successfully update posting
 *       500:
 *         description: Server error
 */
router.put("/posting/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);

  const { is_owner } = (await dao.execSql("is_owner", [req.params.idPosting, tokenDecode.payload.id]))[0];
  if (!is_owner) {
    res.status(400).send({ message: "You are not the owner of the room", status: 400, error: true });
    return;
  }

  const future = dao.execSql("update_posting", [
    req.params.idPosting,
    req.body.price_day,
    req.body.start_date,
    req.body.end_date,
    req.body.state,
    //TODO: req.body.features,
    req.body.public,
    req.body.content,
    req.body.name,
    req.body.country,
    req.body.city,
    req.body.max_number_guests,
    req.body.latitude,
    req.body.longitude
  ]);
  future
    .then((result) => {
      res.status(200).send({ message: result, status: 200, error: false });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Data base: " + error, status: 500, error: true });
    });
});

/**
 * @swagger
 * /posting/{idPosting}:
 *   delete:
 *     tags:
 *       - posting
 *     description: delete posting
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: path
 *         description: idposting
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully delete posting
 *       500:
 *         description: Server error
 */
router.delete("/posting/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("delete_posting", [req.params.idPosting]);
  future
    .then((result) => {
      res.status(200).send({ message: result, status: 200, error: false });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Data base: " + error, status: 500, error: true });
    });
});

/**
 * @swagger
 * /posting/search:
 *    get:
 *     tags:
 *       - posting
 *     description: get posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: priceMin
 *         in: query
 *         required: false
 *         type: number
 *       - name: priceMax
 *         in: query
 *         required: false
 *         type: number
 *       - name: startDate
 *         in: query
 *         required: false
 *         type: string
 *         description: YYYY-MM-DD HH24:MI:SS
 *       - name: endDate
 *         in: query
 *         required: false
 *         type: string
 *         description: YYYY-MM-DD HH24:MI:SS
 *       - name: feature
 *         in: query
 *         required: false
 *         type: string
 *         description: '{id wifi, id tv, id baño}'
 *       - name: name
 *         in: query
 *         required: false
 *         type: string
 *         description: '{hotel condor}'
 *       - name: max_number_guests
 *         in: query
 *         required: false
 *         type: number
 *         description: '2'
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting/search", async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("search_posting", [
    req.query.priceMin,
    req.query.priceMax,
    req.query.startDate,
    req.query.endDate,
    req.query.feature,
    req.query.name,
    req.query.max_number_guests
  ]);
  future
    .then((result) => {
      res.send({ message: result, status: 200, error: false });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Data base: " + error, status: 500, error: true });
    });
});

/**
 * @swagger
 * /feature:
 *    get:
 *     tags:
 *       - feature
 *     description: get feature
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/feature", async (req, res) => {
  //if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("get_feature");
  future
    .then((result) => {
      res.send({ message: result, status: 200, error: false });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Data base: " + error, status: 500, error: true });
    });
});


/**
 * @swagger
 * /priceRoom/{idPosting}:
 *   put:
 *     tags:
 *       - posting
 *     description: Change price Room
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: path
 *         description: idposting
 *         required: true
 *         type: number
 *       - name: body
 *         description: Update price room
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PricePut'
 *     responses:
 *       200:
 *         description: Successfully update posting
 *       500:
 *         description: Server error
 */
router.put("/priceRoom/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);
  try {
    const { is_owner } = (await dao.execSql("is_owner", [req.params.idPosting, tokenDecode.payload.id]))[0];
    if (!is_owner) {
      res.status(400).send({ message: "You are not the owner of the room", status: 400, error: true });
      return;
    }

    const { get_transaction_hash_room } = (await dao.execSql("get_transaction_hash_room", [req.params.idPosting]))[0];

    let request = {}
    request["transaction_hash_room"] = get_transaction_hash_room;
    request["newPrice"] = req.body.priceRoom;

    const messagePriceRoomChanged = await apiClientSC.changePriceRoom(request, handlerResponse.handlerResponse)
    if (messagePriceRoomChanged.error) {
      res.status(messagePriceRoomChanged.status).send(messagePriceRoomChanged);
      return;
    }

    await dao.execSql("update_posting", [
      req.params.idPosting, req.body.priceRoom, null, null, null, null, null, null, null, null, null]);
      
    res.status(200).send(messagePriceRoomChanged);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  };
});

/**
 * @swagger
 * /posting/searchLiked:
 *    get:
 *     tags:
 *       - posting
 *     description: get posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: priceMin
 *         in: query
 *         required: false
 *         type: number
 *       - name: priceMax
 *         in: query
 *         required: false
 *         type: number
 *       - name: startDate
 *         in: query
 *         required: false
 *         type: string
 *         description: YYYY-MM-DD HH24:MI:SS
 *       - name: endDate
 *         in: query
 *         required: false
 *         type: string
 *         description: YYYY-MM-DD HH24:MI:SS
 *       - name: feature
 *         in: query
 *         required: false
 *         type: string
 *         description: '{id wifi, id tv, id baño}'
 *       - name: name
 *         in: query
 *         required: false
 *         type: string
 *         description: '{hotel condor}'
 *       - name: max_number_guests
 *         in: query
 *         required: false
 *         type: number
 *         description: '2'
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting/searchLiked", async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("search_posting_liked", [
    req.query.priceMin,
    req.query.priceMax,
    req.query.startDate,
    req.query.endDate,
    req.query.feature,
    req.query.name,
    req.query.max_number_guests
  ]);
  future
    .then((result) => {
      res.send({ message: result, status: 200, error: false });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Data base: " + error, status: 500, error: true });
    });
});


/**
 * @swagger
 * /posting/nearbyHotels:
 *    get:
 *     tags:
 *       - posting
 *     description: get nearby hotels
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: MyLatitude
 *         in: query
 *         required: false
 *         type: number
 *       - name: MyLongitude
 *         in: query
 *         required: false
 *         type: number
 *       - name: numberPostings
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting/nearbyHotels", async (req, res) => {
  if (!validToken.validToken(req, res)) return
  try {
    const postings = await dao.execSql("nearby_hotels", [
      req.query.MyLatitude,
      req.query.MyLongitude,
      req.query.numberPostings
    ]);

    res.status(200).send({ message: postings, status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  };
});


/**
 * @swagger
 * /posting/hotelsInArea:
 *    get:
 *     tags:
 *       - posting
 *     description: get hotels in specific area
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: latitude
 *         in: query
 *         required: true
 *         type: number
 *       - name: longitude
 *         in: query
 *         required: true
 *         type: number
 *       - name: radioArea
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting/hotelsInArea", async (req, res) => {
  try {
    if (!validToken.validToken(req, res)) return;
    const postings = await dao.execSql("hotels_in_area", [
      req.query.latitude,
      req.query.longitude,
      req.query.radioArea
    ]);

    res.status(200).send({ message: postings, status: 200, error: false });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  };
});

module.exports = router;
