const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const actorModel = require("../models/actor.model");
const apiRoutes = require("../helper/apiRoute");

// Actor add by Admin
exports.addActor = async (req, res, next) => {
  try {
    if (!req.body.actorName) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Actor name is required",
      });
    }
    if (!req.file) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Please upload actor image",
      });
    }
    const actor = new actorModel({
      actorName: req.body.actorName,
      actorImage: req.file.filename,
    });
    await actor.save();
    return res.status(200).json({
      status: responseStatusText.SUCCESS,
      message: "Actor added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.getActor = async (req, res) => {
  try {
    const actorData = await actorModel.find().select("-__v");
    if (actorData.length > 0) {
      actorData.forEach((actor) => {
        actor[
          "actorImage"
        ] = `${process.env.IMAGE_URL}/actor/${actor["actorImage"]}`;
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Actor fetched successfully",
      actorData,
    });
    // const currentPage = apiRoutes.USER_LIST;
    // return res.render("getUsersList", { userDataList, currentPage });
  } catch (error) {
    console.log("🚀 ~ exports.getActor= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
