const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const screensModel = require("../models/screens.model");

// Add screen by Admin
exports.addScreen = async (req, res) => {
  try {
    await screensModel.create(req.body);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Screen added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addScreen= ~ error:", error)
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all screen by Admin
exports.getAllScreens = async (req, res) => {
  try {
    const screenData = await screensModel.find().select("-__v");
    if (screenData.length > 0) {
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Screen fetched successfully",
        screenData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No screen found",
    });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
