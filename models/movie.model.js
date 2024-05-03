const mongoose = require("mongoose");

const movieInfoSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
    },
    languageTypes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    movieThumbImg: {
      type: String,
    },
    movieBanner: {
      type: String,
    },
    movieType: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    releaseDate: {
      type: Date,
    },
    duration: {
      type: String,
    },
    movieShowType: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    description: {
      type: String,
    },
    castId: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    crewId: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const movieInfoModel = mongoose.model("movieInfo", movieInfoSchema);
module.exports = movieInfoModel;
