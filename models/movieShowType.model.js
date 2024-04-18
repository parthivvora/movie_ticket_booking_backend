const mongoose = require("mongoose");

const movieShowTypeSchema = new mongoose.Schema({
  movieShowTypeName: {
    type: String,
    require: true,
  },
});

const movieShowTypeModel = mongoose.model("movieShowType", movieShowTypeSchema);
module.exports = movieShowTypeModel;
