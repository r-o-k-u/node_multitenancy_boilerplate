const auth_service = require("./auth_service");
const responder = require("../../../utils/responder");
const { tokens } = require("../../../config/index");
const common = require("../../../utils/common");
const { errorHelper } = require("../../../utils/index");
const { validateRegister, validateRefreshToken } = require("../../validators/user.validator");

const ipHelper = require("../../../utils/helpers/ip-helper");
const bcrypt = require("bcryptjs");
const { hash } = bcrypt;
const geoip = require("geoip-lite");
const { lookup } = geoip;
const { verify } = require("jsonwebtoken");
const {
  signConfirmCodeToken,
  signAccessToken,
  signRefreshToken,
} = require("../../../utils/helpers/jwt-token-helper");

let AuthController = {
  register: async (request, response, next) => {
    try {
      const { error } = validateRegister(request.body);
      if (error) {
        let code = "00025";
        if (error.details[0].message.includes("email")) code = "00026";
        else if (error.details[0].message.includes("password")) code = "00027";
        else if (error.details[0].message.includes("firstName")) code = "00028";
        else if (error.details[0].message.includes("role")) code = "00029";
        else if (error.details[0].message.includes("lastName")) code = "00031";
        console.log(error);
        return response.status(400).json(errorHelper(code, request, error.details[0].message));
      }
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      let payload = request.body;
      payload.isSuperAdmin ? "" : (payload.isSuperAdmin = 0);
      payload.acceptTerms ? " " : (payload.acceptTerms = 1);
      payload.phone ? (payload.phone = common.verifyNumber(payload.phone)) : "";
      let user = await auth_service.registerUser(payload, dbkey, "https://qwerty.co.ke");
      responder.sendResponse(response, 200, "success", user, "User Created  successfully.");
    } catch (error) {
      return next(error);
    }
  },
  authenticate: async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const ipAddress = request.ip;
      if (!email || !password) {
        let code = "00025";
        return response.status(400).json(errorHelper(code, request, "email or password missing"));
      }
      let dbkey = request.tenant_db;

      console.log("authenticate  controller  dbkey", dbkey);
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      let user = await auth_service.authenticate({ email, password, ipAddress }, dbkey);
      if (Object.keys(user).length > 0) {
        responder.sendResponse(response, 200, "success", user, "User authenticated  successfully.");
      } else {
        response.status(400).send(errorHelper("00002", request)).end();
      }
    } catch (error) {
      return next(error);
    }
  },

  forgetPassword: async (request, response, next) => {
    try {
      responder.sendResponse(response, 200, "success", "password forgotten successfully.");
    } catch (error) {
      return next(error);
    }
  },

  logout: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size, role, domain, id } = request.query;
      if (!request.query.id) return response.status(400).send(errorHelper("00022", request)).end();
      var condition = {};
      id ? (condition.user_id = parseInt(id)) : null;
      let user = await auth_service.logout(condition, dbkey);
      if (Object.keys(user).length > 0) {
        responder.sendResponse(response, 200, "success", user, "User logout  successfully.");
      } else {
        response.status(400).send(errorHelper("00002", request)).end();
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },

  refreshToken: async (request, response, next) => {
    let dbkey = request.tenant_db;
    if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
    try {
      const { error } = validateRefreshToken(request.body);
      if (error)
        return response.status(400).json(errorHelper("00059", request, error.details[0].message));
      try {
        request.user = verify(request.body.refreshToken, tokens.refreshTokenSecretKey);
      } catch (err) {
        return response.status(400).json(errorHelper("00063", request, err.message));
      }
      let token = await auth_service.getToken(
        {
          user_id: request.user.id,
        },
        dbkey
      );

      if (token[0].type !== "refresh" || !token[0])
        return response.status(404).json(errorHelper("00061", request));

      if (token[0].expires <= Date.now())
        return response.status(400).json(errorHelper("00062", request));

      const accessToken = signAccessToken(request.user.id);
      const refreshToken = signRefreshToken(request.user.id);
      let token_update = await auth_service.updateToken(
        {
          user_id: request.user.id,
        },
        {
          token: refreshToken,
          type: "refresh",
          createdByIp: "", //ipHelper(req),
          createdAt: Date.now(),
          expires: Date.now() + 604800000,
        },
        dbkey
      );
      if (Object.keys(token).length > 0) {
        responder.sendResponse(
          response,
          200,
          "success",
          {
            jwtToken: accessToken,
            refreshToken: refreshToken,
          },
          "token refreshed  successfully. "
        );
      } else {
        response.status(400).send(errorHelper("00002", request)).end();
      }
    } catch (error) {
      return next(error);
    }
  },

  revokeToken: async (request, response, next) => {
    try {
      responder.sendResponse(response, 200, "success", "token revoked  successfully.");
    } catch (error) {
      return next(error);
    }
  },
  validateResetToken: async (request, response, next) => {
    try {
      responder.sendResponse(
        response,
        200,
        "success",
        "reset token validated successfully successfully."
      );
    } catch (error) {
      return next(error);
    }
  },

  sendVerificationCode: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      responder.sendResponse(response, 200, "success", "verification email sent successfully.");
    } catch (error) {
      return next(error);
    }
  },
  verifyEmail: async (request, response, next) => {
    try {
      responder.sendResponse(response, 200, "success", "verifyEmail successfully.");
    } catch (error) {
      return next(error);
    }
  },
  resetPassword: async (request, response, next) => {
    try {
      responder.sendResponse(response, 200, "success", "change password successfully.");
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = AuthController;
