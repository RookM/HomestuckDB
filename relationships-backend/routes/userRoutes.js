const express = require("express");
const router = express.Router();
const { incrementShip } = require("../controllers/userController");
const { getNameList } = require("../controllers/setupController");

router.route("/").get(getNameList).post(incrementShip);

module.exports = router;
