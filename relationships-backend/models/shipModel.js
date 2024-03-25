const mongoose = require("mongoose");

const shipSchema = mongoose.Schema(
  {
    ship_name: {
      type: String,
      required: [true, "Value for Ship Name (\"ship_name\") Required for Character"],
      unique: true,
    },
    first_id: {
      type: mongoose.ObjectId,
      required: [true, "Value for First Character\'s ID (\"first_id\") Required for Character"],
    },
    second_id: {
      type: mongoose.ObjectId,
      required: [true, "Value for Second Character\'s ID (\"second_id\") Required for Character"],
    },
    flushed: {
      type: Number,
      cast: "Value for Flushed Quadrant (\"flushed\") Must be a Number",
      default: 0,
      min: 0,
    },
    pitch: {
      type: Number,
      cast: "Value for Pitch Quadrant (\"pitch\") Must be a Number",
      default: 0,
      min: 0,
    },
    pale: {
      type: Number,
      cast: "Value for Pale Quadrant (\"pale\") Must be a Number",
      default: 0,
      min: 0,
    },
    ashen: {
      type: Number,
      cast: "Value for Ashen Quadrant (\"ashen\") Must be a Number",
      default: 0,
      min: 0,
    },
    other: {
      type: Number,
      cast: "Value for Other Quadrant (\"other\") Must be a Number",
      default: 0,
      min: 0,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Ship", shipSchema);