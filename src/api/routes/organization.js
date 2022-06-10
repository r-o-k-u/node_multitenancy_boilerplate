const { Router } = require("express");
const organizationController = require("../services/organization/organizations_controller");
const { checkAuth, checkTenant, checkAuthority } = require("../middlewares/index");
const router = Router();

// AUTH
router.post("/create", function (request, response, next) {
  organizationController.create(request, response, next);
});

router.get("/", function (request, response, next) {
  organizationController.fetch(request, response, next);
});

router.patch("/", function (request, response, next) {
  organizationController.update(request, response, next);
});

router.delete("/remove/", function (request, response, next) {
  organizationController.remove(request, response, next);
});
router.delete("/deactivate/", function (request, response, next) {
  organizationController.deactivate(request, response, next);
});

module.exports = router;
