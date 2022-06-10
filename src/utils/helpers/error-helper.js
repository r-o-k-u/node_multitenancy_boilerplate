const logger = require("../logger.js");
const en = require("../lang/en.js");
const sw = require("../lang/sw.js");

module.exports = (code, req, errorMessage) => {
  // console.log("errorMessage", errorMessage);
  //NOTE: This control routes every server error to the same lang key.
  let key = code;
  if (!en[code]) key = "00008";

  let userId = "";
  if (req && req.user && req.user.id) userId = req.user.id;
  if (code) {
    const enMessage = en[key];
    const swMessage = sw[key];
    if (enMessage.includes("server error")) {
      logger(code, userId, errorMessage, "Server Error", req);
    } else {
      // logger(code, userId, errorMessage ?? enMessage, 'Client Error', req);
    }

    return {
      resultMessage: {
        en: enMessage,
        sw: swMessage,
      },
      resultCode: code,
    };
  } else {
    return {
      resultMessage: {
        en: errorMessage,
        sw: errorMessage,
      },
      resultCode: code,
    };
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       properties:
 *         resultMessage:
 *           $ref: '/components/schemas/ResultMessage'
 *         resultCode:
 *           $ref: '/components/schemas/ResultCode'
 *     ResultMessage:
 *       type: object
 *       properties:
 *         en:
 *           type: string
 *         sw:
 *           type: string
 *     ResultCode:
 *       type: string
 */
