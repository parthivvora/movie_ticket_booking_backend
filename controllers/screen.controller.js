const apiRoutes = require("../helper/apiRoute");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const screensModel = require("../models/screens.model");
const theaterModel = require("../models/theater.model");

// Add screen by Admin
exports.addScreen = async (req, res) => {
  try {
    await screensModel.create(req.body);
    req.flash("success", "Screen added successfully");
    return res.redirect(apiRoutes.ADD_SCREEN);
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Screen added successfully",
    // });
  } catch (error) {
    console.log("🚀 ~ exports.addScreen= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.addScreenPageRender = async (req, res) => {
  try {
    const currentPage = apiRoutes.ADD_SCREEN;
    const theaterData = await theaterModel.find().select("-__v");
    return res.render("addScreen", { currentPage, theaterData });
  } catch (error) {
    console.log("🚀 ~ exports.addScreen= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all screen by Admin
exports.getAllScreens = async (req, res) => {
  try {
    const screenData = await screensModel.aggregate([
      {
        $lookup: {
          from: "theaters",
          localField: "theaterId",
          foreignField: "_id",
          as: "theaterData",
        },
      },
      {
        $unwind: {
          path: "$theaterData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          __v: 0,
          "theaterData.totalScreens": 0,
          "theaterData.__v": 0,
        },
      },
    ]);
    if (screenData.length > 0) {
      const currentPage = apiRoutes.ALL_SCREEN;
      return res.render("viewScreen", { screenData, currentPage });
      // return res.status(responseStatusCode.SUCCESS).json({
      //   status: responseStatusText.SUCCESS,
      //   message: "Screen fetched successfully",
      //   screenData,
      // });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No screen found",
    });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
