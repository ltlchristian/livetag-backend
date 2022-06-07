const EventsModel = require("../models/Events");
const ParticipantModel = require("../models/Participants");
const ActivitiesModel = require("../models/Activities");

const MobileController = {
  getEventByCode(req, res) {
    const code = req.params.code;
    console.log("getEventByCode", code);

    EventsModel.findOne({ code }).then((result) => {
      res.send(result);
    });
  },

  getParticipantById(req, res) {
    const idParticipant = req.params.id;
    console.log("getParticipantById", idParticipant);

    ParticipantModel.findById(idParticipant)

      .populate(["role", "optional_activities", "event"])
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log("Error getParticipantById :", error);
        res.sendStatus(500);
      });
  },

  getActivitiesById(req, res) {
    ActivitiesModel.findById(req.params.id).then((result) => {
      console.log(result);
      res.send(result);
    });
  },

  getActivitiesByEvent(req, res) {
    const idEvent = req.query.idEvent;
    console.log("getActivitiesByEvent", idEvent);

    if (!idEvent) return res.sendStatus(400);

    ActivitiesModel.find({ event: idEvent })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log("Error :", error);
        res.sendStatus(500);
      });
  },
};

module.exports = MobileController;
