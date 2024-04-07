const express = require("express");
const router = express.Router();
const { createAllShips } = require("../controllers/setupController");

router.route("/").post(createAllShips);

module.exports = router;