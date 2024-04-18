const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const movieTypeModel = require("../models/movieType.model");

// Add movie type by Admin
exports.addMovieType = async (req, res) => {
  try {
    if (!req.body.movieTypeName) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Movie type name is required",
      });
    }
    await movieTypeModel.create(req.body);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Movie type added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addLanguage= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all movie type by Admin
exports.getAllMovieType = async (req, res) => {
  try {
    const movieTypeData = await movieTypeModel.find().select("-__v");
    if (movieTypeData.length > 0) {
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Movie type fetched successfully",
        movieTypeData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No movie type found",
    });
  } catch (error) {
    console.log("🚀 ~ exports.getAllMovieType= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
