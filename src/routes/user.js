const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());
var validToken = require('./tokenController.js')
var decodeToken = require('./tokenController.js')
var jwt = require('jsonwebtoken')


const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - user
 *     description: User registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Username to use for registration.
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
router.post("/user", (req, res, next) => {
  futureResponse = apiClient.register(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
  });
});

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
  validToken.validToken(req, res);
  futureResponse = apiClient.updateUser(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
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
    resultJson = result["json"];
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

    futureResponse.then((result) => {
      res.status(result["status"]).send(token);
    });
  });
});

/**
 * @swagger
 * /login-googleAuth:
 *   post:
 *     tags:
 *       - login
 *     description: User login by google
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Username to use for login.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LoginGoogle'
 *     responses:
 *       200:
 *         description: Successfully login by Google
 *       500:
 *         description: Server error
 */
router.post("/login-googleAuth", (req, res, next) => {
  futureResponse = apiClient.loginGoogle(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
  });
});


/**
 * @swagger
 * /register-admin:
 *   post:
 *     tags:
 *       - user
 *     description: User registration admin
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: Username to use for register admin.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RegistrationAdmin'
 *     responses:
 *       200:
 *         description: Successfully registration
 *       500:
 *         description: Server error
 */
router.post("/register-admin", (req, res, next) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);
  req.body["user_logged_id"] = tokenDecode.payload.id;
  futureResponse = apiClient.registerAdmin(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
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
    res.status(result["status"]).send(result["message"]);
  });
});

module.exports = router;
