const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Value for First Name (\"first_name\") Required for Character"],
      unique: true,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
      cast: "Value for Age (\"age\") Must be a Number",
      min: [13, "Value for Age (\"age\") Must be Above 13"],
    },
    species: {
      type: String,
      enum: {
        values: ["Human", "Troll", "Cherub", "Sprite"],
        message: "Value for Species (\"species\") is Invalid",
      },
      required: [true, "Value for Species (\"species\") Required for Character"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Character", characterSchema);
