const { Router } = require("express");
const {
  smsController,
  smsTemplateController,
  smsSettingsController,
} = require("../services/communication/communication_controller");
const { checkAuth, checkTenant, checkAuthority } = require("../middlewares/index");

const router = Router();

// SMS
router.post("/create", checkTenant, checkAuth, function (request, response, next) {
  smsController.create(request, response, next);
});

router.get("/", checkTenant, checkAuth, function (request, response, next) {
  smsController.fetch(request, response, next);
});

router.get("/smsBalance", checkTenant, checkAuth, function (request, response, next) {
  smsController.getBalance(request, response, next);
});

router.delete("/remove/", checkTenant, checkAuth, function (request, response, next) {
  smsController.remove(request, response, next);
});
router.delete("/deactivate/", checkTenant, checkAuth, function (request, response, next) {
  smsController.deactivate(request, response, next);
});

// SMS TEMPLATE
router.post("/template/create", checkTenant, checkAuth, function (request, response, next) {
  smsTemplateController.create(request, response, next);
});

router.get("/template/", checkTenant, checkAuth, function (request, response, next) {
  smsTemplateController.fetch(request, response, next);
});

router.delete("/template/remove/", checkTenant, checkAuth, function (request, response, next) {
  smsTemplateController.remove(request, response, next);
});
router.delete("/template/deactivate/", checkTenant, checkAuth, function (request, response, next) {
  smsTemplateController.deactivate(request, response, next);
});

// SMS settings
router.post("/sms/settings/create", checkTenant, checkAuth, function (request, response, next) {
  smsSettingsController.create(request, response, next);
});

router.get("/sms/settings/", checkTenant, checkAuth, function (request, response, next) {
  smsSettingsController.fetch(request, response, next);
});

router.delete("/sms/settings/remove/", checkTenant, checkAuth, function (request, response, next) {
  smsSettingsController.remove(request, response, next);
});
router.delete(
  "/sms/settings/deactivate/",
  checkTenant,
  checkAuth,
  function (request, response, next) {
    smsSettingsController.deactivate(request, response, next);
  }
);

module.exports = router;
