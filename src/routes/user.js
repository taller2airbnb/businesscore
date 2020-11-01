const ApiClient = require('../../src/communication/client/ApiClient');

const getSettingProfile = require('../../settings.js');

const { FakeRequester } = require('../../src/communication/requester/FakeRequester');
const  RemoteRequester  = require('../../src/communication/requester/RemoteRequester');

const { Router } = require("express");
const router = Router();
var request = require("request");
var cors = require("cors")
const bodyParser = require('body-parser')

router.get("/profile-status", (req, res, next) => {
    request.get(
        "https://taller2airbnb-profile.herokuapp.com/health",
        (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            res.send(JSON.parse(body));
        }
    );
});

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

router.get("/profile-register", (req, res, next) => {
    apiClient.register(req, response);
});

module.exports = router;
