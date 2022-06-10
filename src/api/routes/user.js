const { Router } = require("express");
const { checkAuth, checkTenant, checkAuthority, imageUpload } = require("../middlewares/index");
const {
  UserController,
  UserGroupController,
  UserRoleController,
} = require("../services/user/user_controller");

const router = Router();

//USER ROLES
router.get("/role/:id", checkTenant, checkAuth, function (request, response, next) {
  UserRoleController.getUserRole(request, response, next);
});
router.get("/role/", checkTenant, checkAuth, function (request, response, next) {
  UserRoleController.getUserRoles(request, response, next);
});
router.patch("/role/", checkTenant, checkAuth, function (request, response, next) {
  UserRoleController.updateUserRole(request, response, next);
});
router.delete("/role/deactivate", checkTenant, checkAuth, function (request, response, next) {
  UserRoleController.deactivateUserRole(request, response, next);
});
router.delete("/role/", checkTenant, checkAuth, function (request, response, next) {
  UserRoleController.deleteUserRole(request, response, next);
});

//USER GROUPS
router.get("/group/:id", checkTenant, checkAuth, function (request, response, next) {
  UserGroupController.getUserGroup(request, response, next);
});
router.get("/group/", checkTenant, checkAuth, function (request, response, next) {
  UserGroupController.getUserGroups(request, response, next);
});
router.patch("/group/", checkTenant, checkAuth, function (request, response, next) {
  UserGroupController.updateUserGroup(request, response, next);
});
router.delete("/group/deactivate", checkTenant, checkAuth, function (request, response, next) {
  UserGroupController.deactivateUserGroup(request, response, next);
});
router.delete("/group/", checkTenant, checkAuth, function (request, response, next) {
  UserGroupController.deleteUserGroup(request, response, next);
});
//USER
router.get("/:id", checkTenant, checkAuth, function (request, response, next) {
  UserController.getUser(request, response, next);
});
router.get("/", checkTenant, checkAuth, function (request, response, next) {
  UserController.getUsers(request, response, next);
});
router.patch("/", checkTenant, checkAuth, function (request, response, next) {
  UserController.updateUser(request, response, next);
});
router.delete("/deactivate", checkTenant, checkAuth, function (request, response, next) {
  UserController.deactivateUser(request, response, next);
});
router.delete("/", checkTenant, checkAuth, function (request, response, next) {
  UserController.deleteUser(request, response, next);
});

module.exports = router;
