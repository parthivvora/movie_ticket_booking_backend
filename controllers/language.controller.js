const apiRoutes = require("../helper/apiRoute");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const languageModel = require("../models/language.model");

// Add language by Admin
exports.addLanguage = async (req, res) => {
  try {
    if (!req.body.languageName) {
      req.flash("error", "Language name is required");
      return res.redirect(apiRoutes.ADD_LANGUAGE);
      // return res.status(responseStatusCode.FORBIDDEN).json({
      //   status: responseStatusText.ERROR,
      //   message: "Language name is required",
      // });
    }
    await languageModel.create(req.body);
    req.flash("success", "Language added successfully");
    return res.redirect(apiRoutes.ADD_LANGUAGE);
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Language added successfully",
    // });
  } catch (error) {
    console.log("🚀 ~ exports.addLanguage= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.addLanguagePageRender = async (req, res) => {
  try {
    const currentPage = apiRoutes.ADD_LANGUAGE;
    return res.render("addLanguage", { currentPage });
  } catch (error) {
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
      const currentPage = apiRoutes.ALL_LANGUAGE;
      return res.render("viewLanguage", { languageData, currentPage });
      // return res.status(responseStatusCode.SUCCESS).json({
      //   status: responseStatusText.SUCCESS,
      //   message: "Language fetched successfully",
      //   languageData,
      // });
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
