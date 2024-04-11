const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const subscribeModel = require("../models/subscribe.model");

// Add subscribe information by User
exports.addSubscribeDetails = async (req, res) => {
  try {
    await subscribeModel.create(req.body);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Subscribe information added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addSubscribeDetails= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all subscribe information by Admin
exports.getSubscribeDetails = async (req, res) => {
  try {
    const subscribeData = await subscribeModel.find().select("-__v");
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Subscribe information fetched successfully",
      subscribeData,
    });
  } catch (error) {
    console.log("🚀 ~ exports.getSubscribeDetails= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
