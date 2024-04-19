const mongoose = require("mongoose");

const showTimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
});

const showTimeModel = mongoose.model("showTime", showTimeSchema);
module.exports = showTimeModel;
