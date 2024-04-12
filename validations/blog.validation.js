const joi = require("joi");

exports.addBlogValidation = joi.object({
  blogTitle: joi.string().required(),
  blogDescription: joi.string().required(),
});
