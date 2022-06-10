const organizationsDataProvider = require("../services/organization/organizations_dataprovider");
const { errorHelper, ipHelper } = require("../../utils/index");
const dbConnector = require("../../db/index");
const dbRepo = require("../../db/models");
const { db } = require("../../config/index");
const common = require("../../utils/common");
const organization_service = require("../../api/services/organization/organizations_service");

// this middleware will check if the tenant is valid or not. the tenant is gotten from the header which is passed from the client by the middleware in the client.
module.exports = async (request, res, next) => {
  if (!request.headers["x-tenant-id"]) return res.status(400).json(errorHelper("05001", request));
  let ip = "no-ip";
  if (request !== "") ip = ipHelper(request);
  const protocol = request.protocol;
  const host = request.get("host");
  const endpoint = request.originalUrl;
  var fullUrl = protocol + "://" + host + endpoint;

  let tenant_id = request.headers["x-tenant-id"] || null;
  console.log("ip", ip);
  console.log("protocol", request.protocol);
  console.log("host", request.get("host"));
  console.log("original URl", request.originalUrl);

  let dbkey = "default";

  const { page, size } = request.query;
  const { limit, offset } = common.getPagination(page, size);
  let condition = {};
  console.log("host", host);
  if (tenant_id !== "null") {
    condition.tenant_id = tenant_id;
  } else {
    condition.domain = host;
  }
  const organization = await organization_service
    .findOrganizations(db.database, condition, limit, offset)
    .catch((err) => {
      console.log("err", err);
    });

  if (organization.count > 0 && organization.rows[0].name !== "Organization One") {
    // applies to tenants
    dbkey = `organization_${organization.rows[0].id}`;
    dbConnector.addSequelizeConnectionToRepo(dbRepo, dbkey);
    request.tenant = organization.rows[0];
    console.log("request.tenant0", request.tenant);
  } else if (organization.count > 0 && organization.rows[0].name == "Organization One") {
    //applies to default db
    dbkey = db.database;
    request.tenant = organization.rows[0];
  } else if (organization.count == 0 && (host !== "localhost:2121" || host !== "localhost:3000")) {
    //applies to development/ test environment
    dbkey = db.database;
    const organization = await organization_service

      .findOrganizations(db.database, { domain: "organizationone.com:443" }, limit, offset)
      .catch((err) => {
        console.log("err", err);
      });
    request.tenant = organization.rows[0];
  }
  if (!request.tenant) return res.status(400).json(errorHelper("05002", request));

  console.log("new db key", dbkey);

  request.tenant_db = dbkey;
  request.ip = ip;

  next();
};
