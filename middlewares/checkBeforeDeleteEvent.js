const ActivitiesModel = require("../models/Activities");
const ParticipantModel = require("../models/Participants");
const RoleModel = require("../models/Roles");

const checkBeforeDeleteEvent = (req, res, next) => {
  console.log("===> checkBeforeDeleteEvent");
  const idEvent = req.params.id;
  if (!idEvent) return res.sendStatus(400);
  const query = { event: idEvent };
  ActivitiesModel.countDocuments(query)
    .then((count) => {
      console.log(count);

      if (count === 0) {
        RoleModel.countDocuments(query)
          .then((count) => {
            console.log(count);
            if (count === 0) {
              ParticipantModel.countDocuments(query)
                .then((count) => {
                  console.log(count);
                  if (count === 0) {
                    next();
                  } else {
                    res
                      .status(401)
                      .send(
                        "événement associé à un participant, vous ne pouvez pas le supprimer "
                      );
                  }
                })
                .catch((error) => {
                  console.log("Error count participant", error);
                  res.sendStatus(500);
                });
            } else {
              res
                .status(401)
                .send(
                  "événement associé à un rôle, vous ne pouvez pas le supprimer"
                );
            }
          })
          .catch((error) => {
            console.log("Error count role", error);
            res.sendStatus(500);
          });
      } else {
        res
          .status(401)
          .send(
            "événement associé à une activité, vous ne pouvez pas le supprimer"
          );
      }
    })
    .catch((error) => {
      console.log("Error count activité", error);
      res.sendStatus(500);
    });
};

module.exports = checkBeforeDeleteEvent;
