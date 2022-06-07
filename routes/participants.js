var express = require("express");

const participants = require("../controllers/Participant");
const { checkAuth } = require("./checkAuth");

var router = express.Router();

/* GET */
router.get("/", checkAuth, participants.getAllParticipants);
//router.get("/", checkAuth, participants.getAllParticipants);
router.get("/:id", checkAuth, participants.getOneParticipant);
//router.get("/:id", checkAuth, participants.getOneParticipant);
router.get(
  "/byname/:firstname/:lastname",
  checkAuth,
  participants.getParticipantByName
); // NO OK
router.get("/byemail/:email", checkAuth, participants.getParticipantByEmail);
router.get("/byevent/:idEvent", checkAuth, participants.getParticipantByEvent);

/* POST */
router.post("/", checkAuth, participants.createParticipant);

/* PUT */
router.put("/:id", checkAuth, participants.updateParticipant);

/* DELETE */
router.delete("/:id", checkAuth, participants.deleteParticipant);

module.exports = router;
