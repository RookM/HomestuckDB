const express = require("express");
const router = express.Router();
const { incrementShip } = require("../controllers/userController");

router.route("/").post(incrementShip);

module.exports = router;
