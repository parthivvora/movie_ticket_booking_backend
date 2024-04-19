const mongoose = require("mongoose");

const screensSchema = new mongoose.Schema({
  screensName: {
    type: String,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const screensModel = mongoose.model("screens", screensSchema);
module.exports = screensModel;
