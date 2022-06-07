var express = require("express");
var router = express.Router();

const users = require("../controllers/Users");
const { checkAuth } = require("./checkAuth");

router.get("/", checkAuth, users.getUsers);

router.put("/data", checkAuth, users.putUserData);
router.put("/pwd", checkAuth, users.putUserPassword);

module.exports = router;
