const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema(
  {
    crewName: {
      type: String,
    },
    crewImage: {
      type: String,
    },
    crewRole: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const crewModel = mongoose.model("crews", crewSchema);
module.exports = crewModel;
