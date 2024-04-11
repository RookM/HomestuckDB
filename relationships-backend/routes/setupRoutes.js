const express = require("express");
const router = express.Router();
const { createAllShips, clearAllShips } = require("../controllers/setupController");

router.route("/").post(createAllShips).delete(clearAllShips);

module.exports = router;