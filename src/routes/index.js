const { Router } = require("express");
const router = Router();
var request = require("request");

router.get("/", (req, res) => {
  res.send("Bienvenido a airbnb bussines core");
});

router.get("/profile-status", (req, res) => {
  request.get(
    "https://taller2airbnb-profile.herokuapp.com/health.json",
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      res.send(JSON.parse(body));
    }
  );
});

router.get("/health", (req, res) => {
  res.send(JSON.stringify({ status: "UP", from: "bussines-core" }));
});

module.exports = router;
