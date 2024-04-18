const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  theaterName: {
    type: String,
  },
  city: {
    type: String,
  },
  totalScreens: {
    type: Number,
  },
});

const theaterModel = mongoose.model("theater", theaterSchema);
module.exports = theaterModel;
