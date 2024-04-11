const joi = require("joi");

exports.addContactValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  message: joi.string().required(),
});
