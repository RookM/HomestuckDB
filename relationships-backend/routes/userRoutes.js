const express = require("express");
const router = express.Router();
const { incrementShip } = require("../controllers/userController");
const { getNameList } = require("../controllers/setupController");
const { getShips } = require("../controllers/shipController");

router.route("/").get(getNameList).post(incrementShip);
router.route("/all").get(getShips);

module.exports = router;
