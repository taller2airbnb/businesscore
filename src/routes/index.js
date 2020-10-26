const { Router } = require("express");
const router = Router();
var request = require("request");
var cors = require("cors")
const bodyParser = require('body-parser')

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "swagger-airbnb-bussinescore",
            description: "Swagger bussines core"
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
    res.status(200).send("Bienvenido a airbnb bussines core");
});

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
    res.send(JSON.stringify({ status: "UP", from: "bussines-core" }));
});

module.exports = router;
