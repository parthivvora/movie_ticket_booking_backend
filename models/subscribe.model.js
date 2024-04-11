const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const subscribeModel = mongoose.model("subscribes", subscribeSchema);
module.exports = subscribeModel;
