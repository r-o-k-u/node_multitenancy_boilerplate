const Joi = require("joi");

function validateRegister(body) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(24).required(),
    lastName: Joi.string().min(3).max(24).required(),
    email: Joi.string().email().min(3).required(),
    phone: Joi.string().min(9).max(12).optional(),
    photo: Joi.string().min(5).max(200).optional(),
    isSuperAdmin: Joi.optional(),
    acceptTerms: Joi.optional(),
    group_id: Joi.number().required(),
    password: Joi.optional(),
    gender: Joi.string().valid("Male", "Female").required(),
    /*  language: Joi.string().valid('sw', 'en').required(),
    platform: Joi.string().valid('Android', 'IOS' , 'Win32').required(),
    timezone: Joi.number().required(),
    deviceId: Joi.string().min(4).required()  */
  });
  return schema.validate(body);
}

function validateLogin(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

function validateSendVerificationCode(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
  });
  return schema.validate(body);
}

function validateVerifyEmail(body) {
  const schema = Joi.object({
    token: Joi.string().min(10).required(),
    code: Joi.string().length(4).required(),
  });
  return schema.validate(body);
}

function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required(),
  });
  return schema.validate(body);
}

function validateForgotPassword(body) {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

function validateChangePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

function validateEditUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    username: Joi.string().min(3).max(15),
    language: Joi.string().valid("tr", "en"),
    gender: Joi.string().valid("male", "female", "other"),
    birthDate: Joi.date(),
  });
  return schema.validate(body);
}

module.exports = {
  validateChangePassword,
  validateEditUser,
  validateLogin,
  validateRefreshToken,
  validateSendVerificationCode,
  validateVerifyEmail,
  validateRegister,
  validateForgotPassword,
};
