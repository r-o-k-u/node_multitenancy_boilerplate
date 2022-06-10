const { Router } = require("express");
const authController = require("../services/auth/auth_controller");
const { checkAuth, checkTenant, checkAuthority } = require("../middlewares/index");
const router = Router();

// AUTH
router.post("/register", function (request, response, next) {
  authController.register(request, response, next);
});

router.post("/authenticate", function (request, response, next) {
  authController.authenticate(request, response, next);
});
router.post("/logout", checkTenant, checkAuth, function (request, response, next) {
  authController.logout(request, response, next);
});
router.post("/verify-email", function (request, response, next) {
  authController.verifyEmail(request, response, next);
});
router.post("/refresh-token", checkTenant, function (request, response, next) {
  authController.refreshToken(request, response, next);
});
router.post("/revoke-token", function (request, response, next) {
  authController.revokeToken(request, response, next);
});
router.post("/forgot-password", function (request, response, next) {
  authController.forgetPassword(request, response, next);
});
router.post("/validate-reset-token", function (request, response, next) {
  authController.validateResetToken(request, response, next);
});
router.post("/send-verification-code", function (request, response, next) {
  authController.sendVerificationCode(request, response, next);
});
router.post("/reset-password", function (request, response, next) {
  authController.resetPassword(request, response, next);
});

module.exports = router;
