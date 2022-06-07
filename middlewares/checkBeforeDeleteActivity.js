const RolesModel = require("../models/Roles");

const checkBeforeDeleteActivity = (req, res, next) => {
  console.log("===> checkBeforeDeleteActivity");
  const idActivity = req.params.id;
  if (!idActivity) return res.sendStatus(400);
  const query = { activities: idActivity };
  RolesModel.countDocuments(query)
    .then((count) => {
      console.log(count);
      if (count > 0) {
        res
          .status(401)
          .send("Activité associée à un rôle, vous ne pouvez pas la supprimer");
      } else next();
    })
    .catch((error) => {
      console.log("Error checkBeforeDeleteActivity", error);
      res.sendStatus(500);
    });
};

module.exports = checkBeforeDeleteActivity;
