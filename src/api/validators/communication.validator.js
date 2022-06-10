const Joi = require("joi");

function validateAddSms(body) {
  const schema = Joi.object({
    schedule_date: Joi.date().required(),
    organization_id: Joi.number().required(),
    type: Joi.string().min(4).max(12).required(),
    message: Joi.string().min(2).max(256).required(),
    contacts: Joi.array().required(),
    status: Joi.string()
      .valid("unprocessed", "processed", "resent", "failed", "inactive")
      .required(),
  });
  return schema.validate(body);
}
function validateAddSmsSettings(body) {
  const schema = Joi.object({
    sender_id: Joi.string().min(2).max(11).required(),
    api_key: Joi.string().min(4).max(256).required(),
    api_secret: Joi.string().min(4).max(256).required(),
    api_access_key: Joi.string().min(2).max(256).required(),
    organization_id: Joi.number().required(),
    //provider: Joi.string().valid("africas_talking", "system", "twilio", "other").required(),
  });
  return schema.validate(body);
}

function validateAddTemplate(body) {
  const schema = Joi.object({
    description: Joi.string().min(3).max(256).required(),
    type: Joi.string().valid("EMAIL", "SMS").required(),
    characters: Joi.string().min(3).max(24).required(),
    subject: Joi.string().min(3).max(24).optional(),
    variables: Joi.object().optional(),
    message: Joi.string().min(3).max(24).required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateAddTemplate,
  validateAddSms,
  validateAddSmsSettings,
};
