const dbRepo = require("../db/models");
const dbConnector = require("../db/index");
const { db } = require("../config");
const organizationsDataProvider = require("../api/services/organization/organizations_dataprovider");

let Common = {
  getdbkeyFromRequest: async (request) => {
    let tenant_id = request.headers["x-tenant-id"] || request.customHeader;
    console.log("tenant_id", tenant_id);

    let dbkey = db.database;
    if (tenant_id) {
      dbkey = `tenant_${tenant_id}`;
    }
    console.log("new db key", dbkey);
    //console.log("new repo", dbRepo[dbkey])
    if (!dbRepo[dbkey]) {
      let account = await organizationsDataProvider.findOrganizations(tenant_id);
      console.log("account", account);
      if (account) {
        //  console.log("account success" , dbRepo, dbkey)
        dbConnector.addSequelizeConnectionToRepo(dbRepo, dbkey);
      } else {
        console.log("dbkey default");
        dbkey = db.database;
      }
    }
    console.log("dbkey final", dbkey);
    return dbkey;
  },

  getPagination: (page, size) => {
    const limit = size ? +size : 100000;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  },
  getPagingData: (payload, page, limit) => {
    const { count: totalItems, rows: rows } = payload;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, rows, totalPages, currentPage };
  },
  verifyNumber: (n) => {
    n = n + "";
    if (n[0] + n[1] + n[2] === "254") {
      return parseInt(n);
    } else {
      return parseInt("254" + parseInt(n));
    }
  },
  uniqueID: () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  },
};

module.exports = Common;
