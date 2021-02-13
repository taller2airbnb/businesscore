const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());

const { logger } = require("../config/logger.js");
const {Storage} = require('@google-cloud/storage');

const Multer = require('multer');

const storage = new Storage({
  credentials: require('../config/bookbnb-degoas-ed-firebase-adminsdk-j0yl9-8fffe79fdf.json')
});

const bucket = storage.bucket("gs://bookbnb-degoas-ed.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

/**
 * @swagger
 * /upload:
 *   post:
 *     tags:
 *       - images
 *     description: Image upload
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: file
 *         description: Image to store
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully image upload
 *       500:
 *         description: Server error
 */
router.post('/upload', multer.single('file'), async (req, res) => {
  logger.log({
    service: req.method + ": " + req.originalUrl,
    level: "info",
    message: "Image upload" + req.file.originalname,
  });

  let file = req.file;

  if (file) {

    bucket.upload("/Users/ccordoba/Documents/" + file.originalname, function(error, file) {
      if (!error) {
        res.status(200).send({
          message: "Image upload: " + file.metadata.name,
          status: 200,
          error: false
        });
      } else {
        res.status(500).send({ 
          message: error, status: 500, error: true 
        });
      }
    });
    
  }
});

module.exports = router;