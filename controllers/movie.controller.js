const path = require("path");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const movieModel = require("../models/movie.model");
const { addMovieValidation } = require("../validations/movie.validation");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const apiRoutes = require("../helper/apiRoute");
const languageModel = require("../models/language.model");
const movieTypeModel = require("../models/movieType.model");
const movieShowTypeModel = require("../models/movieShowType.model");
const actorModel = require("../models/actor.model");
const crewModel = require("../models/crew.model");

// Add movie by Admin
exports.addMovie = async (req, res) => {
  try {
    const { error, value } = addMovieValidation.validate(req.body);
    if (error) {
      fs.unlinkSync(
        path.join(
          __dirname,
          `../public/movieImages/${req.files.movieThumbImg[0].filename}`
        )
      );
      fs.unlinkSync(
        path.join(
          __dirname,
          `../public/movieImages/${req.files.movieBanner[0].filename}`
        )
      );
      req.flash("error", error.details[0].message);
      return res.redirect(apiRoutes.ADD_MOVIE);
    }
    if (!req.files) {
      req.flash("error", "Please select a file to upload");
      return res.redirect(apiRoutes.ADD_MOVIE);
    }
    const movie = new movieModel({
      movieName: value.movieName,
      languageTypes: value.languageTypes,
      movieThumbImg: req.files.movieThumbImg[0].filename,
      movieBanner: req.files.movieBanner[0].filename,
      movieType: value.movieType,
      releaseDate: value.releaseDate,
      duration: value.duration,
      movieShowType: value.movieShowType,
      description: value.description,
      castId: value.castId,
      crewId: value.crewId,
    });
    await movie.save();
    req.flash("success", "Movie added successfully");
    return res.redirect(apiRoutes.ADD_MOVIE);
  } catch (error) {
    console.log("🚀 ~ exports.addMovie= ~ error:", error);
    fs.unlinkSync(
      path.join(
        __dirname,
        `../public/movieImages/${req.files?.movieThumbImg[0]?.filename}`
      )
    );
    fs.unlinkSync(
      path.join(
        __dirname,
        `../public/movieImages/${req.files?.movieBanner[0]?.filename}`
      )
    );
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

exports.addMoviePageRender = async (req, res) => {
  try {
    const currentPage = apiRoutes.ADD_MOVIE;
    const languageData = await languageModel.find().select("-__v");
    const movieTypeData = await movieTypeModel.find().select("-__v");
    const movieShowTypeData = await movieShowTypeModel.find().select("-__v");
    const actorData = await actorModel.find().select("-__v");
    const crewData = await crewModel.find().select("-__v");
    return res.render("addMovie", {
      currentPage,
      languageData,
      movieTypeData,
      movieShowTypeData,
      actorData,
      crewData,
    });
  } catch (error) {
    console.log("🚀 ~ exports.addMovie= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all movie data by Admin
exports.getAllMovies = async (req, res) => {
  try {
    const movieData = await movieModel.aggregate([
      {
        $lookup: {
          from: "languages",
          localField: "languageTypes",
          foreignField: "_id",
          as: "languageData",
        },
      },
      {
        $lookup: {
          from: "movietypes",
          localField: "movieType",
          foreignField: "_id",
          as: "movieTypeData",
        },
      },
      {
        $lookup: {
          from: "movieshowtypes",
          localField: "movieShowType",
          foreignField: "_id",
          as: "movieShowTypeData",
        },
      },
      {
        $lookup: {
          from: "actors",
          localField: "castId",
          foreignField: "_id",
          as: "castData",
        },
      },
      {
        $lookup: {
          from: "crews",
          localField: "crewId",
          foreignField: "_id",
          as: "crewData",
        },
      },
      {
        $project: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          languageTypes: 0,
          movieType: 0,
          movieShowType: 0,
          castId: 0,
          crewId: 0,
          "languageData.__v": 0,
          "movieTypeData.__v": 0,
          "movieShowTypeData.__v": 0,
          "castData.createdAt": 0,
          "castData.updatedAt": 0,
          "castData.__v": 0,
          "crewData.createdAt": 0,
          "crewData.updatedAt": 0,
          "crewData.__v": 0,
        },
      },
    ]);
    if (movieData.length > 0) {
      Object.keys(movieData).forEach((key) => {
        movieData[key][
          "movieThumbImg"
        ] = `${process.env.IMAGE_URL}/movieImages/${movieData[key]["movieThumbImg"]}`;
        movieData[key][
          "movieBanner"
        ] = `${process.env.IMAGE_URL}/movieImages/${movieData[key]["movieBanner"]}`;
      });
      const currentPage = apiRoutes.ALL_MOVIE;
      return res.render("viewMovie", { movieData, currentPage });
      // return res.status(responseStatusCode.INTERNAL_SERVER).json({
      //   status: responseStatusText.ERROR,
      //   movieData,
      // });
    }
  } catch (error) {
    console.log("🚀 ~ exports.getAllMovies= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
