const mongoose = require("mongoose");

const movieRatingSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    review: {
      type: String,
    },
    likeReview: {
      type: Number,
      default: 0,
    },
    dislikeReview: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const movieRatingModel = mongoose.model("movieRatings", movieRatingSchema);
module.exports = movieRatingModel;
