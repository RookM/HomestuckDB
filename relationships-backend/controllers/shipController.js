const asyncHandler = require("express-async-handler");
const Ship = require("../models/shipModel");
const { constants } = require("../constants");

//@desc Get all Ships
//@route GET /api/ships
//@access public
const getShips = asyncHandler(async (req, res) => {
  const ships = await Ship.find();
  res.status(200).json(ships);
});

//@desc Get Ship
//@route GET /api/ships/:id
//@access public
const getShip = asyncHandler(async (req, res) => {
  // Checks if ID is valid
  let ship;
  try {
    ship = await Ship.findById(req.params.id);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Invalid ID");
  }

  if (!ship) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Ship Not Found");
  }
  res.status(200).json(ship);
});

//@desc Create Ship
//@route POST /api/ships
//@access public
const createShip = asyncHandler(async (req, res) => {
  const { ship_name, first_id, second_id, flushed, pitch, pale, ashen, other } =
    req.body;
  // Checks if body is empty
  if (
    !ship_name &&
    !first_id &&
    !second_id &&
    !flushed &&
    !pitch &&
    !pale &&
    !ashen &&
    !other
  ) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Request Empty.");
  }

  // Checks if any errors occur with the model
  const ship = new Ship({
    ship_name,
    first_id,
    second_id,
    flushed,
    pitch,
    pale,
    ashen,
    other,
  });
  try {
    await ship.save();
    res.status(200).json(ship);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    if (error.name === "ValidationError") {
      if (error.errors.ship_name) {
        throw new Error(error.errors.ship_name.message);
      } else if (error.errors.first_id) {
        throw new Error(error.errors.first_id.message);
      } else if (error.errors.second_id) {
        throw new Error(error.errors.second_id.message);
      } else if (error.errors.flushed) {
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
    } else {
      throw new Error("Invalid Input: Ship Name Must be Unique.");
    }
  }
});

//@desc Update Ship
//@route PUT /api/ships/:id
//@access public
const updateShip = asyncHandler(async (req, res) => {
  const { ship_name, first_id, second_id, flushed, pitch, pale, ashen, other } =
    req.body;
  // Checks if ID is valid
  let ship;
  try {
    ship = await Ship.findById(req.params.id);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Invalid ID");
  }

  if (!ship) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Ship Not Found");
  }

  ship.ship_name = ship_name;
  ship.first_id = first_id;
  ship.second_id = second_id;
  ship.flushed = flushed;
  ship.pitch = pitch;
  ship.pale = pale;
  ship.ashen = ashen;
  ship.other = other;

  try {
    await ship.save();
    res.status(200).json(ship);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    if (error.name === "ValidationError") {
      if (error.errors.ship_name) {
        throw new Error(error.errors.ship_name.message);
      } else if (error.errors.first_id) {
        throw new Error(error.errors.first_id.message);
      } else if (error.errors.second_id) {
        throw new Error(error.errors.second_id.message);
      } else if (error.errors.flushed) {
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
    } else {
      throw new Error("Invalid Input: Ship Name Must be Unique.");
    }
  }
});

//@desc Delete Ship
//@route DELETE /api/ships/:id
//@access public
const deleteShip = asyncHandler(async (req, res) => {
  // Checks if ID is valid
  let ship;
  try {
    ship = await Ship.findById(req.params.id);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Invalid ID");
  }

  if (!ship) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Ship Not Found");
  }

  await Ship.deleteOne(ship);
  res.status(200).json(ship);
});

module.exports = {
  getShips,
  getShip,
  createShip,
  updateShip,
  deleteShip,
};
