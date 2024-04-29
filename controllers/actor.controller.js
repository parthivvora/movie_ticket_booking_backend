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
      // return res.status(responseStatusCode.FORBIDDEN).json({
      //   status: responseStatusText.ERROR,
      //   message: "Actor name is required",
      // });
      req.flash("error", "Actor name is required");
      return res.redirect(apiRoutes.ADD_ACTOR);
    }
    if (!req.file) {
      // return res.status(responseStatusCode.FORBIDDEN).json({
      //   status: responseStatusText.ERROR,
      //   message: "Please upload actor image",
      // });
      req.flash("error", "Please upload actor image");
      return res.redirect(apiRoutes.ADD_ACTOR);
    }
    const actor = new actorModel({
      actorName: req.body.actorName,
      actorImage: req.file.filename,
    });
    await actor.save();
    // return res.status(200).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Actor added successfully",
    // });
    req.flash("success", "Actor added successfully");
    return res.redirect(apiRoutes.ADD_ACTOR);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.addActorPageRender = async (req, res, next) => {
  try {
    const currentPage = apiRoutes.ADD_ACTOR;
    return res.render("addActor", { currentPage });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all actor list by Admin
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
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Actor fetched successfully",
    //   actorData,
    // });
    const currentPage = apiRoutes.ALL_ACTOR;
    return res.render("viewActor", { actorData, currentPage });
  } catch (error) {
    console.log("🚀 ~ exports.getActor= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
