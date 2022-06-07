var express = require("express");
var router = express.Router();
const { checkAuth } = require("./checkAuth");
const activities = require("../controllers/Activities");
const checkBeforeDeleteActivity = require("../middlewares/checkBeforeDeleteActivity");

/* GET activities page*/
router.get("/", activities.getAllActivities);

/* GET activities par ID */
router.get("/:id", checkAuth, activities.getActivitiesById);

/* delete activities */
router.delete(
  "/:id",
  checkAuth,
  checkBeforeDeleteActivity,
  activities.deleteActivities
);

/*Update activities */
router.post("/:idActivity", checkAuth, activities.updateActivities);

/*create activity*/
router.post("/", checkAuth, activities.createActivities);

// search by title
router.get(
  "/search/:activity_name",
  checkAuth,
  activities.searchActivitiesByTitle
);

router.get("/roles/:idRole/optional_activities", activities.getOptionalActivities);

module.exports = router;
