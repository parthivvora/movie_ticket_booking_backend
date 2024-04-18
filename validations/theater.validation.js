const joi = require("joi");

exports.addTheaterValidation = joi.object({
  theaterName: joi.string().required(),
  city: joi.string().required(),
  totalScreens: joi.number().required(),
});
