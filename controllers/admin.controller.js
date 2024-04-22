const jwt = require("jsonwebtoken");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const adminModel = require("../models/admin.model");
const { adminLoginValidation } = require("../validations/admin.validation");
const userModel = require("../models/user.model");

// Admin login
exports.getAdminLogin = (req, res, next) => {
  try {
    return res.render("login", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.log("🚀 ~ exports.getAdminLogin= ~ error:", error);
    // return res.status(responseStatusCode.INTERNAL_SERVER).json({
    //   status: responseStatusText.ERROR,
    //   message: error.message,
    // });
    return next(error);
  }
};

// Dashboard
exports.getDashboard = (req, res, next) => {
  try {
    return res.render("home");
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

exports.getUserLists = async (req, res) => {
  try {
    const userDataList = await userModel.find().select("-__v");
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "User lists fetched successfully",
      userDataList,
    });
  } catch (error) {
    console.log("🚀 ~ exports.getUserLists= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
