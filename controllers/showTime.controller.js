const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const showTimesModel = require("../models/showTimes.model");

// Add show time of movies by Admin
exports.addShowTimes = async (req, res) => {
  try {
    await showTimesModel.create(req.body);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Show time of movies added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addShowTimes= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all show time of movies by Admin
exports.getAllShowTime = async (req, res) => {
  try {
    const showTimeData = await showTimesModel.find().select("-__v");
    if (showTimeData.length > 0) {
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Show time of movies fetched successfully",
        showTimeData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No show time of movies found",
    });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
