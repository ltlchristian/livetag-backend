const RoleModel = require("../models/Roles");
const dayjs = require("dayjs");
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween);

const checkInscriptionLink = (req, res, next) => {
  console.log("===> checkInscriptionLink");
  const idRole = req.params.idRole;
  console.log(idRole);
  RoleModel.findById(idRole)
    .populate(["event"])
    .then((role) => {
      const start = Date.now();
      if(dayjs(start).isBefore(role.event.end_date)) next();
      else res.status(401).send("Date de fin de l'evennement atteinte ou dépassée");
    })
    .catch((error) => {
      console.log("Error checkInscriptionLink", error);
      res.sendStatus(500);
    });
};

module.exports = checkInscriptionLink;
