const { Router } = require("express");
const router = Router();
var cors = require("cors")
const getSettingProfile = require("../../settings.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const handlerResponse = require("./hanlderResponse");
const RemoteRequester = require("../../src/communication/requester/RemoteRequester");
const ApiClient = require("../../src/communication/client/ApiClient");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "swagger-airbnb-businesscore",
            description: "Swagger business core"
        },
        servers: ["http://localhost:3000"]
    },
    // ['.routes/*.js']
    apis: ["src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});

router.use(cors());
router.options('*', cors());


/**
 * @swagger
 * /:
 *    get:
 *      description: bienvenida
 *      responses:
 *         200:
 *           description: Mensaje de bienvenida
 */
router.get("/", (req, res) => {
    res.status(200).send("Bienvenido a airbnb business core");
});

const remoteApiUrl = getSettingProfile.getSettingProfile("API_URL");
const requester = new RemoteRequester(remoteApiUrl);
const apiClient = new ApiClient(requester);

    /**
     * @swagger
     * /status-profile:
     *    get:
     *      description: status profile
     *      responses:
     *          '200':
     *           description: status profile server
     */
    router.get("/status-profile", (req, res, next) => {
        futureResponse = apiClient.statusProfile(req.body, handlerResponse.handlerResponse);
        futureResponse.then((result) => {
            res.send(result);
        });
    });


/**
 * @swagger
 * /health:
 *    get:
 *      description: health
 *      responses:
 *          '200':
 *           description: health UP
 */
router.get("/health", (req, res) => {
    res.send(JSON.stringify({ status: "UP", from: "business-core" }));
});

module.exports = router;
