const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  type: Joi.string().valid("coniferous", "leafy").required(),
});

module.exports = schema;
