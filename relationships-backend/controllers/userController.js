const asyncHandler = require("express-async-handler");
const Ship = require("../models/shipModel");
const { constants } = require("../constants");

//@desc Increment Quadrant in Ship
//@route POST /api/user/
//@access public
const incrementShip = asyncHandler(async (req, res) => {
  const origin = req.get("origin");
  if (origin != "https://yggs.neocities.org") {
    res.status(401);
    throw new Error("Unauthorized: Request from Unauthorized Source");
  }

  const { ship_name, quadrant } = req.body;
  // Checks if ship_name is valid
  let ship = await Ship.findOne({ ship_name });

  if (!ship) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Ship Not Found");
  }

  if (quadrant == "flushed") {
    ship.flushed += 1;
  } else if (quadrant == "pitch") {
    ship.pitch += 1;
  } else if (quadrant == "pale") {
    ship.pale += 1;
  } else if (quadrant == "ashen") {
    ship.ashen += 1;
  } else if (quadrant == "other") {
    ship.other += 1;
  } else {
    res.status(200).json({"ship_name":ship.ship_name, "flushed":ship.flushed, "pitch":ship.pitch, "pale":ship.pale, "ashen":ship.ashen, "other":ship.other });
  }

  try {
    await ship.save();
    res.status(200).json(ship);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    if (error.name === "ValidationError") {
      if (error.errors.ship_name) {
        throw new Error(error.errors.flushed.message);
      } else if (error.errors.pitch) {
        throw new Error(error.errors.pitch.message);
      } else if (error.errors.pale) {
        throw new Error(error.errors.pale.message);
      } else if (error.errors.ashen) {
        throw new Error(error.errors.ashen.message);
      } else if (error.errors.other) {
        throw new Error(error.errors.other.message);
      }
    }
  }
});

module.exports = { incrementShip };
