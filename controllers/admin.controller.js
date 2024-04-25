const jwt = require("jsonwebtoken");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const adminModel = require("../models/admin.model");
const { adminLoginValidation } = require("../validations/admin.validation");
const userModel = require("../models/user.model");
const apiRoutes = require("../helper/apiRoute");

// Admin login
exports.getAdminLogin = (req, res, next) => {
  try {
    return res.render("login");
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
    const currentPage = apiRoutes.DASHBOARD;
    return res.render("home", { currentPage });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

exports.getUserLists = async (req, res) => {
  try {
    const userDataList = await userModel.find().select("-__v");
    const currentPage = apiRoutes.USER_LIST;
    return res.render("getUsersList", { userDataList, currentPage });
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "User lists fetched successfully",
    //   userDataList,
    // });
  } catch (error) {
    console.log("🚀 ~ exports.getUserLists= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
