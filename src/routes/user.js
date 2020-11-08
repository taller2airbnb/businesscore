const ApiClient = require("../../src/communication/client/ApiClient");
const getSettingProfile = require("../../settings.js");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());
var bodyParser = require('body-parser')
var validToken = require('./tokenController.js')
var jwt = require('jsonwebtoken')


const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

/**
 * @swagger
 * /profile-register:
 *   post:
 *     tags:
 *       - profile-register
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
router.post("/profile-register", (req, res, next) => {
  futureResponse = apiClient.register(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {
    res.send(result);
  });
});

/**
 * @swagger
 * /profile-login:
 *   post:
 *     tags:
 *       - profile-login
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
router.post("/profile-login", (req, res, next) => {
  futureResponse = apiClient.login(req.body, handlerResponse.handlerResponse);
  futureResponse.then((result) => {

    var username = result.email
    var password = result.password
    var profile = result.profile
    var id = result.id


    var tokenData = {
      username: username,
      password: password,
      profile: profile,
      id: id
    }

    var token = jwt.sign(tokenData, 'Secret Password', {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    })

    res.send({token})
  });
});

/**
 * @swagger
 * /profile-register-admin:
 *   post:
 *     tags:
 *       - profile-register-admin
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
router.post("/profile-register-admin", (req, res, next) => {

  validToken.validToken(req, res);

  // var username = req.body.email
  // var password = req.body.password
  // var profile = req.body.profile

  //   var jsto= {
  //     username: username,
  //     password: password,
  //     profile: profile
  //   }

  //   res.send({});
});

module.exports = router;
