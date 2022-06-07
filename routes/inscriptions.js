var express = require("express");
var router = express.Router();

const inscriptionController = require("../controllers/Inscriptions");

router.get("/:idLink", inscriptionController.getInscriptionFromLink);
router.post("/:idLink", inscriptionController.createInscriptionFromLink);

module.exports = router;
