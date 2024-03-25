const express = require("express");
const router = express.Router();
const {
  getShips,
  getShip,
  createShip,
  updateShip,
  deleteShip,
} = require("../controllers/shipController");

router.route("/").get(getShips).post(createShip);

router.route("/:id").get(getShip).put(updateShip).delete(deleteShip);

module.exports = router;
