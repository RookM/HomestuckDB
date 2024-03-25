const asyncHandler = require("express-async-handler");
const Character = require("../models/characterModel");
const { constants } = require("../constants");

//@desc Get all Characters
//@route GET /api/characters
//@access public
const getCharacters = asyncHandler(async (req, res) => {
  const characters = await Character.find();
  res.status(200).json(characters);
});

//@desc Get Character
//@route GET /api/characters/:id
//@access public
const getCharacter = asyncHandler(async (req, res) => {
  // Checks if ID is valid
  let character;
  try {
    character = await Character.findById(req.params.id);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Invalid ID");
  }

  if (!character) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Character Not Found");
  }
  res.status(200).json(character);
});

//@desc Create Character
//@route POST /api/characters
//@access public
const createCharacter = asyncHandler(async (req, res) => {
  const { first_name, last_name, age, species } = req.body;
  // Checks if body is empty
  if (!first_name && !last_name && !age && !species) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Request Empty.");
  }

  // Checks if any errors occur with the model
  const character = new Character({
    first_name,
    last_name,
    age,
    species,
  });
  try {
    await character.save();
    res.status(200).json(character);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    if (error.name === "ValidationError") {
      if (error.errors.first_name) {
        throw new Error(error.errors.first_name.message);
      } else if (error.errors.age) {
        throw new Error(error.errors.age.message);
      } else if (error.errors.species) {
        throw new Error(error.errors.species.message);
      }
    } else {
      throw new Error("Invalid Input: First Name Must be Unique.");
    }
  }
});

//@desc Update Character
//@route PUT /api/characters/:id
//@access public
const updateCharacter = asyncHandler(async (req, res) => {
  const { first_name, last_name, age, species } = req.body;
  // Checks if ID is valid
  let character;
  try {
    character = await Character.findById(req.params.id);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Invalid ID");
  }

  if (!character) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Character Not Found");
  }

  character.first_name = first_name;
  character.last_name = last_name;
  character.age = age;
  character.species = species;

  try {
    await character.save();
    res.status(200).json(character);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    if (error.name === "ValidationError") {
      if (error.errors.first_name) {
        throw new Error(error.errors.first_name.message);
      } else if (error.errors.age) {
        throw new Error(error.errors.age.message);
      } else if (error.errors.species) {
        throw new Error(error.errors.species.message);
      }
    } else {
      throw new Error("Invalid Input: First Name Must be Unique.");
    }
  }
});

//@desc Delete Character
//@route DELETE /api/characters/:id
//@access public
const deleteCharacter = asyncHandler(async (req, res) => {
  // Checks if ID is valid
  let character;
  try {
    character = await Character.findById(req.params.id);
  } catch (error) {
    res.status(constants.INVALID_INPUT);
    throw new Error("Invalid Input: Invalid ID");
  }

  if (!character) {
    res.status(constants.NOT_FOUND);
    throw new Error("Not Found: Character Not Found");
  }

  await Character.deleteOne(character);
  res.status(200).json(character);
});

module.exports = {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
