const express = require("express");
const router = express.Router();
const {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characterController");

router.route("/").get(getCharacters).post(createCharacter);

router.route("/:id").get(getCharacter).put(updateCharacter).delete(deleteCharacter);

module.exports = router;
