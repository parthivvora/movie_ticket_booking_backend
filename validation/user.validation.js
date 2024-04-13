const joi = require("joi");

exports.registerValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().alphanum().min(4).max(10).required(),
  contact: joi.number().required(),
});
