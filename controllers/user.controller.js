const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { userRegisterValidation } = require("../validations/user.validation");

exports.userRegister = async (req, res) => {
  try {
    const { error, value } = userRegisterValidation.validate(req.body);
    if (error) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: error.details[0].message,
      });
    }
    await userModel.create(value);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.userRegister= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
