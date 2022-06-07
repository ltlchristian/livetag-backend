var express = require("express");
var router = express.Router();

const qrCodeController = require("../controllers/QrCode");
const { checkAuth } = require("./checkAuth");

router.post("/:idParticipant", checkAuth, qrCodeController.generateQrCode);

module.exports = router;
