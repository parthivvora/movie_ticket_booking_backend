const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const movieShowTypeModel = require("../models/movieShowType.model");

// Add movie show type by Admin
exports.addMovieShowType = async (req, res) => {
  try {
    if (!req.body.movieShowTypeName) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Movie show type name is required",
      });
    }
    await movieShowTypeModel.create(req.body);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Movie show type added successfully",
    });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all movie show type by Admin
exports.getAllMovieShowType = async (req, res) => {
  try {
    const movieShowTypeData = await movieShowTypeModel.find().select("-__v");
    if (movieShowTypeData.length > 0) {
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Movie show type fetched successfully",
        movieShowTypeData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No movie show type found",
    });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
