const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());
var validToken = require('./tokenController.js');
var decodeToken = require('./tokenController.js');
var jwt = require('jsonwebtoken');

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);


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
router.post("/login", (req, res, next) => {
  futureResponse = apiClient.login(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {

    if (result["status"] != 200){
      res.status(result["status"]).send(result);
      return;
    }
    resultJson = result["message"];
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
    result["token"] = token;
    res.status(result["status"]).send(result);
  });
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
router.post("/register", (req, res, next) => {
  if (req.body.user_type == "admin"){
    if (!validToken.validToken(req, res)) return;
    let tokenDecode = decodeToken.decodeToken(req);
    req.body["user_logged_id"] = tokenDecode.payload.id;
  }
 
  futureResponse = apiClient.register(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
  });
});

/**
 * @swagger
 * /change-password:
 *   put:
 *     tags:
 *       - user
 *     description: Change the password
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
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
router.put("/change-password", (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
  futureResponse = apiClient.changePassword(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
  });
});


/**
 * @swagger
 * /posting/{idUser}:
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
router.get("/posting/:idUser", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  futureResponse = apiClient.getUser(req.params.idUser, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.status(result["status"]).send(result);
  });
});

module.exports = router;
