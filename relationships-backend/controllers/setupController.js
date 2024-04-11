const asyncHandler = require("express-async-handler");
const Character = require("../models/characterModel");
const Ship = require("../models/shipModel");
const { constants } = require("../constants");

const characterList = [];
const shipList = [];

function createShip(characterOne, characterTwo) {
  const ship_name = characterOne.first_name + characterTwo.first_name;
  const first_id = characterOne._id;
  const second_id = characterTwo._id;
  const flushed = 0;
  const pitch = 0;
  const pale = 0;
  const ashen = 0;
  const other = 0;

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
    ship.save();
  } catch (error) {
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
};

//@desc Get All Names
//@route GET /api/user/
//@access public
const getNameList = asyncHandler(async (req, res) => {
  let charIndex = 0;

  const allCharacters = await Character.find({});
  allCharacters.forEach(character => {
    characterList[charIndex] = character.first_name;
    charIndex++;
  });

  const jsonString = JSON.stringify(characterList);
  res.status(200).json(jsonString);
});

//@desc Create All Ships
//@route POST /api/setup/
//@access public
const createAllShips = asyncHandler(async (req, res) => {
  let charIndex = 0;
  let shipIndex = 0;

  const allCharacters = await Character.find({});
  allCharacters.forEach(character => {
    characterList[charIndex] = character;
    charIndex++;
  });

  const allShips = await Ship.find({});
  allShips.forEach(ship => {
    shipList[shipIndex] = ship;
    shipIndex++;
  });

  for (let charactersX = 0; charactersX < characterList.length; charactersX++) {
    for (let charactersY = (charactersX + 1); charactersY < characterList.length; charactersY++) {
      let namePair = characterList[charactersX].first_name + characterList[charactersY].first_name;
      let namePairFlipped = characterList[charactersY].first_name + characterList[charactersX].first_name;
      let shipExists = await Ship.exists({ ship_name: namePair });
      let shipFlippedExists = await Ship.exists({ ship_name: namePairFlipped });
      if (!shipExists && !shipFlippedExists) {
        createShip(characterList[charactersX], characterList[charactersY]);
      }
    }
  }

  const jsonString = JSON.stringify(shipList.length);
  res.status(200).json(jsonString);
});

//@desc Clear All Ships
//@route DELETE /api/setup/
//@access public
const clearAllShips = asyncHandler(async (req, res) => {

  const allShips = await Ship.find({});
  allShips.forEach(async (ship) => {
    ship.flushed = 0;
    ship.pitch = 0;
    ship.pale = 0;
    ship.ashen = 0;
    ship.other = 0;
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
  
  const jsonString = JSON.stringify(shipList.length);
  res.status(200).json(jsonString);
});

module.exports = { getNameList, createAllShips, clearAllShips };