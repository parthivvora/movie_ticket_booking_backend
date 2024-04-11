const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../validations/user.validation");
const bcrypt = require("bcrypt");

// User registration
exports.userRegister = async (req, res) => {
  try {
    const { error, value } = userRegisterValidation.validate(req.body);
    if (error) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: error.details[0].message,
      });
    }
    bcrypt.hash(value.password, 10, async (err, hash) => {
      if (err) {
        return res.status(responseStatusCode.INTERNAL_SERVER).json({
          status: responseStatusText.ERROR,
          message: err.message,
        });
      }
      value.password = hash;
      await userModel.create(value);
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.log("🚀 ~ exports.userRegister= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// User login
exports.userLogin = async (req, res) => {
  try {
    const { error, value } = userLoginValidation.validate(req.body);
    if (error) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: error.details[0].message,
      });
    }
    const user = await userModel.findOne({ email: value.email });
    if (!user) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log("🚀 ~ exports.userLogin= ~ error:", error)
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
