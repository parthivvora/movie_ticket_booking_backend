const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const apiRoutes = require("../helper/apiRoute");
const { addMovieRatingValidation } = require("../validations/movie.validation");
const movieRatingModel = require("../models/movieRating.model");

// Add rating and review by User
exports.addMovieRating = async (req, res) => {
  try {
    const { error, value } = addMovieRatingValidation.validate(req.body);
    if (error) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: error.details[0].message,
      });
    }
    await movieRatingModel.create(value);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Movie rating added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addMovieRating= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

