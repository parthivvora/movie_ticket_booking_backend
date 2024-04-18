const path = require("path");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const languageModel = require("../models/language.model");
const { default: mongoose } = require("mongoose");

// Add language by Admin
exports.addLanguage = async (req, res) => {
  try {
    if (!req.body.languageName) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Language name is required",
      });
    }
    await languageModel.create(req.body);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Language added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addLanguage= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all language by Admin
exports.getAllLanguage = async (req, res) => {
  try {
    const languageData = await languageModel.find().select("-__v");
    if (languageData.length > 0) {
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Language fetched successfully",
        languageData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No language found",
    });
  } catch (error) {
    console.log("🚀 ~ exports.getAllLanguage= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
