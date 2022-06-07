var express = require("express");
var router = express.Router();
const stripeController = require("../controllers/Stripe");

router.post("/", stripeController.getStripe);

module.exports = router;
