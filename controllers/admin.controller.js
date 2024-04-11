const jwt = require("jsonwebtoken");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const adminModel = require("../models/admin.model");
const { adminLoginValidation } = require("../validations/admin.validation");
const userModel = require("../models/user.model");

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { error, value } = adminLoginValidation.validate(req.body);
    if (error) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: error.details[0].message,
      });
    }
    const admin = await adminModel.findOne({ email: value.email });
    console.log("🚀 ~ exports.adminLogin= ~ admin:", admin);
    if (!admin) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Admin not found",
      });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Admin logged in successfully",
      token,
    });
  } catch (error) {
    console.log("🚀 ~ exports.adminLogin= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
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
