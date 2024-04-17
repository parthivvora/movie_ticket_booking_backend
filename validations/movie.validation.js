const joi = require("joi");

exports.addMovieValidation = joi.object({
  movieName: joi.string().required(),
  languageTypes: joi.array().required(),
  movieType: joi.array().required(),
  releaseDate: joi.date().required(),
  duration: joi.string().required(),
  movieShowType: joi.array().required(),
  description: joi.string().required(),
  cast: joi.array().items(
    joi.object({
      castName: joi.string().required(),
      castImage: joi.string().required(),
    })
  ),
  crew: joi.array().items(
    joi.object({
      crewName: joi.string().required(),
      crewImage: joi.string().required(),
      crewRole: joi.string().required(),
    })
  ),
});
