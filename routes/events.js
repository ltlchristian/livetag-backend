let express = require("express");
let router = express.Router();
const EventsModel = require("../models/Events");
const { checkAuth } = require("./checkAuth");
const eventController = require("../controllers/Events");
const checkBeforeDeleteEvent = require("../middlewares/checkBeforeDeleteEvent");

/* POST events. */
router.post("/", checkAuth, eventController.createEvent);

/* GET events listing. */
router.get("/", checkAuth, eventController.getEvent);

/* GET event by ID. */
router.get("/:id", checkAuth, eventController.getEventById);

router.get("/user/:idUser", checkAuth, eventController.getEventOfUser);

/* DELETE events by ID. */
router.delete(
  "/:id",
  checkAuth,
  checkBeforeDeleteEvent,
  eventController.deleteEvent
);

/* UPDATE events by ID. */
router.post("/:id", checkAuth, eventController.updateEvent);

module.exports = router;
