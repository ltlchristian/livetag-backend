let express = require("express");
let router = express.Router();

const mobileController = require("../controllers/Mobile");

/* GET events listing. */
router.get("/events/:code", mobileController.getEventByCode);

/*Get participant */
router.get("/participants/:id", mobileController.getParticipantById);

/*Get activities */
router.get("/activities/:id", mobileController.getActivitiesById);

/*Get All activities */
router.get("/activities", mobileController.getActivitiesByEvent);

module.exports = router;
