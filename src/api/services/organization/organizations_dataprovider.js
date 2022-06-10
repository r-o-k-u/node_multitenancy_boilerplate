const dbConnector = require("../../../db");
const dbRepo = require("../../../db/models");
const { db } = require("../../../config/index");
const path = require("path");
const migrationPath = path.join(__dirname + "/../../../db/migrations");
const seedPath = path.join(__dirname + "/../../../db/seeders");

//
const cli = require("../../../utils/cli");
const winston = require("../../../utils/logger/winston");
let OrganizationDataProvider = {
  getOrganizations: async (dbkey, limit, offset) => {
    const Organization = dbRepo[dbkey].organization;
    return new Promise(function (resolve, reject) {
      Organization.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: [""] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findOrganizations: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const Organization = dbRepo[dbkey].organization;
    return new Promise(function (resolve, reject) {
      Organization.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  createOrganization: async (body, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Organization = dbRepo[dbkey || db.database].organization;
    return new Promise(function (resolve, reject) {
      Organization.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateOrganization: async (condition, body, dbkey) => {
    const Organization = dbRepo[dbkey].organization;
    return new Promise(function (resolve, reject) {
      Organization.update(body, { where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deactivateOrganization: async (organizationId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Organization = dbRepo[dbkey].organization;

    return new Promise(function (resolve, reject) {
      Organization.update(
        { deactivated: true, dateDeactivated: new Date() },
        { where: { id: organizationId } }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteOrganization: async (organizationId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Organization = dbRepo[dbkey].organization;

    return new Promise(function (resolve, reject) {
      Organization.destroy({ where: { id: organizationId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createTenantDB: async (organizationId) => {
    let connectionString = `${db.dialect}://${db.username}:${db.password}@${db.host}/organization_${organizationId}`;

    winston.info(`Create Database for Organization Tenant[Name: organization_${organizationId}]`);
    await cli.executeCommand(`npx sequelize db:create --url ${connectionString}`);

    winston.info(`Run Migrations on Tenant Database[Name: organization_${organizationId}]`);
    //`npx sequelize db:migrate --url ${connectionString} --migrations-path=${migrationPath}`;
    await cli
      .executeCommand(
        `npx sequelize db:migrate --url ${connectionString} --migrations-path=${migrationPath}`
      )
      .catch((err) => {
        console.log("eer", err);
      });
    winston.info(`Run Seed on Tenant Database[Name: organization_${organizationId}]`);
    await cli
      .executeCommand(
        `npx sequelize db:seed --seed 20220318095226-user-group.js --url ${connectionString} &&  npx sequelize db:seed --seed 20220318095232-user-role.js --url ${connectionString} `
      )
      .catch((err) => {
        console.log("eer", err);
      });
    winston.info(`adding Tenant Database[Name: organization_${organizationId}] to connection repo`);
    await dbConnector.addSequelizeConnectionToRepo(dbRepo, `organization_${organizationId}`);
  },
};

module.exports = OrganizationDataProvider;
