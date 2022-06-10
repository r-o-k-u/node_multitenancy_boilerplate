const { SmsService, EmailService, smsSettingsService } = require("./communication_service");
const responder = require("../../../utils/responder");
const common = require("../../../utils/common");
const winston = require("../../../utils/logger/winston");
const short = require("short-uuid");
const errorHelper = require("../../../utils/helpers/error-helper");
const {
  validateAddSms,
  validateAddTemplate,
  validateAddSmsSettings,
} = require("../../validators/communication.validator");
const { getSmsBalance } = require("../../../utils/sendSms");
let smsController = {
  create: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { error } = validateAddSms(request.body);
      if (error) {
        let code = "00025";
        if (error.details[0].message.includes("schedule_date")) code = "00501";
        else if (error.details[0].message.includes("type")) code = "00502";
        else if (error.details[0].message.includes("message")) code = "00503";
        else if (error.details[0].message.includes("contacts")) code = "00504";
        else if (error.details[0].message.includes("organization_id")) code = "00019";
        else if (error.details[0].message.includes("status")) code = "00505";

        return response.status(400).json(errorHelper(code, request, error.details[0].message));
      }
      let payload = request.body;
      console.log("tenant", request.tenant);
      payload.organization_id = request.tenant.id;
      let communication = await SmsService.createSms(payload, dbkey, request.tenant);

      responder.sendResponse(response, 200, "success", communication, "sms sent successfully.");
    } catch (error) {
      return next(error);
    }
  },

  fetch: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await SmsService.findSms(dbkey, {}, limit, offset);
      const data = common.getPagingData(communication, page, limit);
      responder.sendResponse(response, 200, "success", data, "sms fetched successfully.");
    } catch (error) {
      return next(error);
    }
  },
  remove: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await SmsService.findSms(dbkey, { ...request.query }, limit, offset);

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = SmsService.deleteSMS(communication.rows[0].id, dbkey);
      responder.sendResponse(response, 200, "success", "sms deleted successfully.");
    } catch (error) {
      return next(error);
    }
  },
  deactivate: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await SmsService.findSMS(dbkey, { ...request.query }, limit, offset);

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = SmsService.deactivateSMS(communication.rows[0].id, dbkey);
      responder.sendResponse(response, 200, "success", "sms deactivated successfully.");
    } catch (error) {
      return next(error);
    }
  },
  getBalance: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      /* if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      } */
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const balance = await getSmsBalance();

      if (!balance) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      responder.sendResponse(response, 200, "success", balance, "sms deleted successfully.");
    } catch (error) {
      return next(error);
    }
  },
};

let smsTemplateController = {
  create: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { error } = validateAddTemplate(request.body);
      if (error) {
        let code = "00025";
        if (error.details[0].message.includes("description")) code = "00510";
        else if (error.details[0].message.includes("type")) code = "00511";
        else if (error.details[0].message.includes("characters")) code = "00515";
        else if (error.details[0].message.includes("subject")) code = "00512";
        else if (error.details[0].message.includes("variables")) code = "00513";
        else if (error.details[0].message.includes("message")) code = "00514";

        return response.status(400).json(errorHelper(code, request, error.details[0].message));
      }
      let payload = request.body;
      payload.code = short.generate();
      payload.active = false;
      let communication = await SmsService.createSmsTemplate(payload, dbkey);

      responder.sendResponse(
        response,
        200,
        "success",
        communication,
        "sms registered successfully."
      );
    } catch (error) {
      console.log("er", error);
      return next(error);
    }
  },

  fetch: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await SmsService.findSmsTemplate(dbkey, {}, limit, offset);
      const data = common.getPagingData(communication, page, limit);
      responder.sendResponse(response, 200, "success", data, "sms fetched successfully.");
    } catch (error) {
      console.log("er", error);
      return next(error);
    }
  },
  remove: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await SmsService.findSmsTemplate(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = SmsService.deactivateSmsTemplate(
        communication.rows[0].id,
        dbkey
      );
      responder.sendResponse(response, 200, "success", "sms deleted successfully.");
    } catch (error) {
      return next(error);
    }
  },
  deactivate: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await SmsService.findSMS(dbkey, { ...request.query }, limit, offset);

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = SmsService.deactivateSmsTemplate(
        communication.rows[0].id,
        dbkey
      );
      responder.sendResponse(response, 200, "success", "sms deactivated successfully.");
    } catch (error) {
      return next(error);
    }
  },
};

let EmailController = {
  create: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { error } = validateAddEmail(request.body);
      if (error) {
        let code = "00025";
        if (error.details[0].message.includes("name")) code = "00020";

        return response.status(400).json(errorHelper(code, request, error.details[0].message));
      }
      let payload = request.body;
      let communication = await EmailService.createEmail(
        {
          name: payload.name,
          //serialNumber: short.generate(),
        },
        dbkey
      );

      responder.sendResponse(
        response,
        200,
        "success",
        communication,
        "Email created successfully."
      );
    } catch (error) {
      return next(error);
    }
  },

  fetch: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await EmailService.findEmail(dbkey, {}, limit, offset);
      const data = common.getPagingData(communication, page, limit);
      responder.sendResponse(response, 200, "success", data, "Email fetched successfully.");
    } catch (error) {
      return next(error);
    }
  },
  remove: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await EmailService.findEmail(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = EmailService.deleteEmail(communication.rows[0].id, dbkey);
      responder.sendResponse(response, 200, "success", "Email deleted successfully.");
    } catch (error) {
      return next(error);
    }
  },
  deactivate: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await EmailService.findEmail(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = EmailService.deactivateEmail(communication.rows[0].id, dbkey);
      responder.sendResponse(response, 200, "success", "Email deactivated successfully.");
    } catch (error) {
      return next(error);
    }
  },
};

let smsSettingsController = {
  create: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { error } = validateAddSmsSettings(request.body);
      if (error) {
        let code = "00025";
        if (error.details[0].message.includes("sender_id")) code = "00506";
        else if (error.details[0].message.includes("api_key")) code = "00507";
        else if (error.details[0].message.includes("api_secret")) code = "00508";
        else if (error.details[0].message.includes("api_access_key")) code = "00509";
        else if (error.details[0].message.includes("organization_id")) code = "00100";
        // else if (error.details[0].message.includes("status")) code = "00505";

        return response.status(400).json(errorHelper(code, request, error.details[0].message));
      }
      let payload = request.body;
      let communication = await smsSettingsService.createSms(payload, dbkey);

      responder.sendResponse(response, 200, "success", communication, "sms sent successfully.");
    } catch (error) {
      return next(error);
    }
  },

  fetch: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await smsSettingsService.findSms(dbkey, {}, limit, offset);
      const data = common.getPagingData(communication, page, limit);
      responder.sendResponse(response, 200, "success", data, "sms fetched successfully.");
    } catch (error) {
      return next(error);
    }
  },
  remove: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await smsSettingsService.findSms(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = smsSettingsService.deleteSMS(communication.rows[0].id, dbkey);
      responder.sendResponse(response, 200, "success", "sms deleted successfully.");
    } catch (error) {
      return next(error);
    }
  },
  deactivate: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const communication = await smsSettingsService.findSMS(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (communication.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedCommunication = smsSettingsService.deactivateSMS(
        communication.rows[0].id,
        dbkey
      );
      responder.sendResponse(response, 200, "success", "sms deactivated successfully.");
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = { smsController, EmailController, smsTemplateController, smsSettingsController };
