const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const crewModel = require("../models/crew.model");
const apiRoutes = require("../helper/apiRoute");

// Crew add by Admin
exports.addCrew = async (req, res, next) => {
  try {
    if (!req.body.crewName && !req.body.crewRole) {
      // return res.status(responseStatusCode.FORBIDDEN).json({
      //   status: responseStatusText.ERROR,
      //   message: "Crew name and role is required",
      // });
      req.flash("error", "Crew name and role is required");
      return res.redirect(apiRoutes.ADD_CREW);
    }
    if (!req.file) {
      // return res.status(responseStatusCode.FORBIDDEN).json({
      //   status: responseStatusText.ERROR,
      //   message: "Please upload crew image",
      // });
      req.flash("error", "Please upload crew image");
      return res.redirect(apiRoutes.ADD_CREW);
    }
    const crew = new crewModel({
      crewName: req.body.crewName,
      crewImage: req.file.filename,
      crewRole: req.body.crewRole,
    });
    await crew.save();
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Crew added successfully",
    // });
    req.flash("success", "Crew added successfully");
    return res.redirect(apiRoutes.ADD_CREW);
  } catch (error) {
    console.log("🚀 ~ exports.addCrew= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.addCrewPageRender = async (req, res, next) => {
  try {
    const currentPage = apiRoutes.ADD_CREW;
    return res.render("addCrew", { currentPage });
  } catch (error) {
    console.log("🚀 ~ exports.addCrewPageRender= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all crew list by Admin
exports.getCrew = async (req, res) => {
  try {
    const crewData = await crewModel.find().select("-__v");
    if (crewData.length > 0) {
      crewData.forEach((crew) => {
        crew[
          "crewImage"
        ] = `${process.env.IMAGE_URL}/crew/${crew["crewImage"]}`;
      });
    }
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Crew fetched successfully",
    //   crewData,
    // });
    const currentPage = apiRoutes.ALL_CREW;
    return res.render("viewCrew", { crewData, currentPage });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
