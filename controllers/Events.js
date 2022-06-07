const EventsModel = require("../models/Events");
const ShortUniqueId = require("short-unique-id");

const uid = new ShortUniqueId({ length: 5 });

const eventController = {
  createEvent(req, res) {
    const { event_name, start_date, end_date, place, description, code } =
      req.body;
    if (!event_name || !start_date || !end_date || !place || !description)
      return res.sendStatus(400);
    EventsModel.create({
      event_name,
      start_date,
      end_date,
      place,
      description,
      code: uid(),
      user: req.user._id,
    })
      .then(() => {
        console.log("Succesfully sent to DB");
        res.send("Client bien reçu en DB");
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  getEvent(req, res, next) {
    EventsModel.find().then((result) => {
      res.send(result);
    });
  },

  getEventById(req, res) {
    const idEvent = req.params.id;
    EventsModel.findById(idEvent).then((result) => {
      console.log("evennement affiché", result);
      res.send(result);
    });
  },

  getEventOfUser(req, res) {
    const idUser = req.params.idUser;

    EventsModel.find({ user: idUser })
      .then((result) => {
        console.log("evennements affichés", result);
        res.send(result);
      })
      .catch((error) => {
        console.log("Error getEventOfUser", error);
        res.sendStatus(500);
      });
  },

  deleteEvent(req, res) {
    const idEvent = req.params.id;
    console.log(idEvent);
    EventsModel.findByIdAndDelete(idEvent).then((result) => {
      console.log("evennement supprimé", result);
      res.send("evennement supprimé");
    });
  },

  updateEvent(req, res) {
    const idEvent = req.params.id;
    console.log(idEvent);
    const { event_name, start_date, end_date, place, description, code } =
      req.body;
    const update = {
      event_name,
      start_date,
      end_date,
      place,
      description,
      code,
    };
    console.log(update);
    EventsModel.findByIdAndUpdate(idEvent, update).then((result) => {
      console.log(result);
      res.send(result);
    });
  },
};

module.exports = eventController;
