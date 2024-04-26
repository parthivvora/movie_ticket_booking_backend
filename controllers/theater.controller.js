const apiRoutes = require("../helper/apiRoute");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const theaterModel = require("../models/theater.model");
const { addTheaterValidation } = require("../validations/theater.validation");

// Add theater by Admin
exports.addTheater = async (req, res) => {
  try {
    const { error, value } = addTheaterValidation.validate(req.body);
    if (error) {
      req.flash("error", error.details[0].message);
      return res.redirect(apiRoutes.ADD_THEATER);
      // return res.status(responseStatusCode.FORBIDDEN).json({
      //   status: responseStatusText.ERROR,
      //   message: error.details[0].message,
      // });
    }
    const theater = new theaterModel({
      theaterName: value.theaterName,
      city: value.city,
      totalScreens: value.totalScreens,
    });
    const result = await theater.save();
    if (result) {
      req.flash("success", "Theater added successfully");
      return res.redirect(apiRoutes.ADD_THEATER);
      // return res.status(responseStatusCode.SUCCESS).json({
      //   status: responseStatusText.SUCCESS,
      //   message: "Theater added successfully",
      // });
    }
  } catch (error) {
    console.log("🚀 ~ exports.addTheater= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.addTheaterPageRender = async (req, res) => {
  try {
    const currentPage = apiRoutes.ADD_THEATER;
    return res.render("addTheater", { currentPage });
  } catch (error) {
    console.log("🚀 ~ exports.addTheater= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all theater by Admin
exports.getAllTheaters = async (req, res) => {
  try {
    const theaterData = await theaterModel.find().select("-__v");
    if (theaterData.length > 0) {
      const currentPage = apiRoutes.ALL_THEATER;
      return res.render("viewTheater", {
        theaterData,
        currentPage,
      });
      // return res.status(responseStatusCode.SUCCESS).json({
      //   status: responseStatusText.SUCCESS,
      //   message: "Theater fetched successfully",
      //   theaterData,
      // });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No theater found",
    });
  } catch (error) {
    console.log("🚀 ~ exports.getAllTheaters= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
