const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    actorName: {
      type: String,
    },
    actorImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const actorModel = mongoose.model("actors", actorSchema);
module.exports = actorModel;
