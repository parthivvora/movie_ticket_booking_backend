const joi = require("joi");

exports.addMovieValidation = joi.object({
  movieName: joi.string().required(),
  languageTypes: joi.array().required(),
  movieType: joi.array().required(),
  releaseDate: joi.date().required(),
  duration: joi.string().required(),
  movieShowType: joi.array().required(),
  description: joi.string().required(),
  castId: joi.array().required(),
  crewId: joi.array().required(),
});

exports.addMovieRatingValidation = joi.object({
  movieId: joi.string().required(),
  review: joi.string().required(),
});