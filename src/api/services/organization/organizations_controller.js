const organization_service = require("./organizations_service");
const auth_service = require("../auth/auth_service");
const responder = require("../../../utils/responder");
const common = require("../../../utils/common");
const winston = require("../../../utils/logger/winston");
const bcrypt = require("bcryptjs");
const short = require("short-uuid");
const errorHelper = require("../../../utils/helpers/error-helper");
const { sendEmail, sendSms } = require("../../../utils/index");
let OrganizationController = {
  create: async (request, response, next) => {
    try {
      let payload = request.body;
      let organization = await organization_service.createOrganization({
        name: payload.name,
        domain: payload.domain,
        owner: payload.email,
        logo: payload.logo || "https://qwerty.co.ke/static/media/finallogin.d57686d9.png",
        tenant_id: short.generate(),
      });

      console.log(`Create Tenant for Organization[ID: ${organization.id}]`);
      await organization_service.createTenantDB(organization.id);

      winston.info(`Add User to Tenant DB[Email: ${payload.email}]`);
      const temp_password = short.generate();
      const password = await bcrypt.hash(temp_password, 10);
      setTimeout(async () => {
        await organization_service
          .createOrganization(
            {
              name: payload.name,
              domain: payload.domain,
              owner: payload.email,
              tenant_id: short.generate(),
            },
            `organization_${organization.id}`
          )
          .then(async () => {
            console.log("organization created");
            await auth_service.registerUser(
              {
                email: payload.email,
                firstName: payload.name,
                lastName: "Admin",
                group_id: "1",
                gender: "Male",
                phone: "",
                passwordHash: password,
                isSuperAdmin: true,
                active: true,
                verified: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              `organization_${organization.id}`
            );
          });

        await sendRegistrationEmail(temp_password, payload.email);
      }, 3000);

      responder.sendResponse(
        response,
        200,
        "success",
        organization,
        "Organizations registered successfully."
      );
    } catch (error) {
      return next(error);
    }
  },

  fetch: async (request, response, next) => {
    try {
      let organization;
      let userData;
      let dbkey = null;
      //if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size, role, domain, id } = request.query;
      if (Object.keys(request.query).length < 1) {
        responder.sendResponse(response, 401, "Error", {}, "domain or id  query required");
      } else {
        var condition = {};
        id ? (condition.id = id) : null;
        domain ? (condition.domain = domain) : null;
        const { limit, offset } = common.getPagination(page, size);

        organization = await organization_service.findOrganizations(
          dbkey,
          condition,
          limit,
          offset
        );
        responder.sendResponse(
          response,
          200,
          "success",
          organization,
          "organization fetched successfully."
        );
      }
    } catch (error) {
      return next(error);
    }
  },

  update: async (request, response, next) => {
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }

      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const organization = await organization_service.findOrganizations(
        dbkey,
        { ...request.query },
        limit,
        offset
      );
      if (organization.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const updateOrganization = organization_service.updateOrganization(
        { id: organization.rows[0].id },
        request.body,
        dbkey
      );
      responder.sendResponse(response, 200, "success", "organization updated successfully.");
    } catch (error) {
      return next(error);
    }
  },
  remove: async (request, response, next) => {
    try {
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const organization = await organization_service.findOrganizations(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (organization.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedOrganization = organization_service.deleteOrganization(
        organization.rows[0].id,
        dbkey
      );
      responder.sendResponse(response, 200, "success", "organization deleted successfully.");
    } catch (error) {
      return next(error);
    }
  },
  deactivate: async (request, response, next) => {
    let dbkey = request.tenant_db;
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if (Object.keys(request.query) < 1) {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      const { page, size } = request.query;
      const { limit, offset } = common.getPagination(page, size);
      const organization = await organization_service.findOrganizations(
        dbkey,
        { ...request.query },
        limit,
        offset
      );

      if (organization.count < 1) {
        return response.status(400).send(errorHelper("00100", request)).end();
      }
      const deletedOrganization = organization_service.deactivateOrganization(
        organization.rows[0].id,
        dbkey
      );
      responder.sendResponse(response, 200, "success", "organization deactivated successfully.");
    } catch (error) {
      return next(error);
    }
  },
};

async function sendRegistrationEmail(password, email) {
  await sendEmail(
    email,
    "Organization Created Successfully",
    `<h4>Registration Successful</h4>
               <p>Thanks for registering!</p>
               <p>You can login on ${"https://qwerty.co.ke/login"} with the credentials below</p>
               <ul>
                <li>username: ${email}</li>
                <li>password: ${password}</li>
               </ul>`,
    "en",
    " ",
    null,
    null
  );
}

module.exports = OrganizationController;
