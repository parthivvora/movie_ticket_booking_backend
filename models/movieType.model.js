const mongoose = require("mongoose");

const movieTypeSchema = new mongoose.Schema({
  movieTypeName: {
    type: String,
    require: true,
  },
});

const movieTypeModel = mongoose.model("movieType", movieTypeSchema);
module.exports = movieTypeModel;
