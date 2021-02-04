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
router.options('*', cors());
var validToken = require('./tokenController.js');
var decodeToken = require('./tokenController.js');
var jwt = require('jsonwebtoken');

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const apiKeyProfileServer = getSettingProfile.getSettingProfile("API_KEY");
const requester = new RemoteRequester(remoteApiUrl);
requester.setApiKey(apiKeyProfileServer);
const apiClient = new ApiClient(requester);

const remoteApiUrlSC = getSettingSC.getSettingSC("API_URL");
const requesterSC = new RemoteRequester(remoteApiUrlSC);
const apiClientSC = new ApiClient(requesterSC);

const { logger } = require("../config/logger.js");

/**
 * @swagger
 * /user:
 *   put:
 *     tags:
 *       - user
 *     description: User update
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: Username to use for update.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UpdateUser'
 *     responses:
 *       200:
 *         description: Successfully update
 *       500:
 *         description: Server error
 */
router.put("/user", (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
  futureResponse = apiClient.updateUser(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: result});
  });
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - login
 *     description: User login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Login'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - password       
 *     responses:
 *       200:
 *         description: Successfully login
 *       500:
 *         description: Server error
 */
router.post("/login", async (req, res, next) => {

  try {
    loginResponse = await apiClient.login(req.body, handlerResponse.handlerResponse);

    if (loginResponse["status"] != 200) {
      res.status(loginResponse["status"]).send(loginResponse);
      return;
    }

    resultJson = loginResponse["message"];
    var username = resultJson.email;
    var profile = resultJson.profile;
    var id = resultJson.id;

    var tokenData = {
      username: username,
      profile: profile,
      id: id
    }

    var token = jwt.sign(tokenData, 'Secret Password', {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    })


    loginResponse["token"] = token;

    const { get_creator_id } = (await dao.execSql("get_creator_id", [id]))[0];
    const messageWallet = await apiClientSC.getWallet(get_creator_id, handlerResponse.handlerResponse);

    if (messageWallet["status"] != 200) {
      res.status(messageWallet["status"]).send(messageWallet);
      return;
    }

    loginResponse.message["wallet"] = messageWallet.message.wallet;
    res.status(loginResponse["status"]).send(loginResponse);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: loginResponse});

  } catch (error) {
    res
      .status(500)
      .send({ message: "SmartContract get wallet address: " + error, status: 500, error: true });
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
  };
});


/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - user
 *     description: User registration
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: Username to use for register.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Registration'
 *     responses:
 *       200:
 *         description: Successfully registration
 *       500:
 *         description: Server error
 */
router.post("/register", async (req, res, next) => {

  let finalResult = {}

  //valido el token
  if (req.body.user_type == "admin") {
    if (!validToken.validToken(req, res)) return;
    let tokenDecode = decodeToken.decodeToken(req);
    req.body["user_logged_id"] = tokenDecode.payload.id;
  }

  //profile server valida la registracion
  futureResponse = apiClient.register(req.body, handlerResponse.handlerResponse);

  futureResponse.then((resultProfileServer) => {

    if (resultProfileServer["status"] != 200) {
      res.status(resultProfileServer["status"]).send(resultProfileServer);
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: resultProfileServer });
      return;
    }

    Object.assign(finalResult, resultProfileServer["message"]);

    //Se crea la wallet
    futureResponseSC = apiClientSC.createIdentity({}, handlerResponse.handlerResponse).catch((error) => {
      res.send({ message: "SmartContract create identity failed: " + error, status: 500, error: true });
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
      return;
    });

    //Se guarda la relacion wallet vs usuario
    futureResponseSC.then((resultSC) => {
      const futureDB = dao.execSql("insert_user_wallet", [
        resultProfileServer.message.id,
        resultSC.message.id
      ]);

      Object.assign(finalResult, resultSC.message)

      futureDB.then((resultDB) => {
        Object.assign(finalResult, resultDB);
        res.status(200).send({ message: finalResult, status: 200, error: false });

        return;
      });

    });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: resultProfileServer});
  });



});

/**
 * @swagger
 * /user/{user_mail}/password/:
 *   put:
 *     tags:
 *       - user
 *     description: Change Password for user's by id and token
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_mail 
 *         description: users mail
 *         in: path
 *         required: true
 *       - name: body
 *         description: Username of user that will change password.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChangePassword'
 *     responses:
 *       200:
 *         description: Successfully update password
 *       500:
 *         description: Server error
 */
router.put("/user/:user_mail/password/", (req, res, next) => {
  futureResponse = apiClient.changePassword(req.params.user_mail, req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: result});
  });
});


/**
 * @swagger
 * /user/{idUser}:
 *   get:
 *     tags:
 *       - user
 *     description: get user 
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idUser
 *         in: path
 *         description: idUser
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully get user
 *       500:
 *         description: Server error
 */
router.get("/user/:idUser", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  userResponse = await apiClient.getUser(req.params.idUser, handlerResponse.handlerResponse);
  const { get_creator_id } = (await dao.execSql("get_creator_id", [req.params.idUser]))[0];
  const messageWallet = await apiClientSC.getWallet(get_creator_id, handlerResponse.handlerResponse);
  if (messageWallet["status"] != 200) {
    res.status(messageWallet["status"]).send(messageWallet);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: messageWallet });
    return;
  }
  userResponse.message["wallet"] = messageWallet.message.wallet;
  res.status(userResponse["status"]).send(userResponse);
  logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: userResponse});
});

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - users
 *     description: get all users
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully get users
 *       500:
 *         description: Server error
 */
router.get("/user", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  futureResponse = apiClient.getUsers(handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: result});
  });
});


/**
 * @swagger
 * /recover_token/{userMail}:
 *   post:
 *     tags:
 *       - user
 *     description: Rocover token
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userMail
 *         description: Mail of user 
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully recover token
 *       500:
 *         description: Server error
 */
router.post("/recover_token/:userMail", (req, res, next) => {
  futureResponse = apiClient.recoverToken(req.params.userMail, req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: result});
  });
});


/**
 * @swagger
 * /user/{user_id}/blocked_status:
 *   put:
 *     tags:
 *       - user
 *     description: Block status of a user
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         description: Id of user 
 *         in: path
 *         required: true
 *       - name: body
 *         description: status.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BlockedStatus'
 *     responses:
 *       200:
 *         description: Successfully block status
 *       500:
 *         description: Server error
 */
router.put("/user/:user_id/blocked_status/", (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
  futureResponse = apiClient.blockedStatus(req.params.user_id, req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: result});
  });
});

module.exports = router;
