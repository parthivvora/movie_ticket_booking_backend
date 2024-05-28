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

// View Rating of movie by Admin
exports.viewMovieRatingByAdmin = async (req, res) => {
  try {
    const movieRatingData = await movieRatingModel.aggregate([
      {
        $lookup: {
          from: "movieinfos",
          localField: "movieId",
          foreignField: "_id",
          as: "movieData",
        },
      },
      {
        $group: {
          _id: "$movieId",
          movieData: { $first: "$movieData" },
          reviews: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          __v: 0,
          "movieData.__v": 0,
        },
      },
    ]);
    if (movieRatingData.length > 0) {
      Object.keys(movieRatingData).forEach((key) => {
        Object.keys(movieRatingData[key]["movieData"]).forEach((i) => {
          movieRatingData[key]["movieData"][i][
            "movieThumbImg"
          ] = `${process.env.IMAGE_URL}/movieImages/${movieRatingData[key]["movieData"][i]["movieThumbImg"]}`;
          movieRatingData[key]["movieData"][i][
            "movieBanner"
          ] = `${process.env.IMAGE_URL}/movieImages/${movieRatingData[key]["movieData"][i]["movieBanner"]}`;
        });
      });
      const currentPage = apiRoutes.ALL_MOVIE_RATING;
      // return res.render("viewMovieRating", {
      //   movieRatingData,
      //   currentPage,
      // });
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Movie rating fetched successfully",
        movieRatingData,
      });
    }
  } catch (error) {
    console.log("🚀 ~ exports.addMovieRating= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
