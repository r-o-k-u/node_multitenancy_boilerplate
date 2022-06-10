const dbConnector = require("../../../db");
const dbRepo = require("../../../db/models");
const { db } = require("../../../config/index");
const path = require("path");
const migrationPath = path.join(__dirname + "/../../../db/migrations");

const cli = require("../../../utils/cli");
const winston = require("../../../utils/logger/winston");
let BankDataProvider = {
  getBanks: async (dbkey, limit, offset) => {
    const Bank = dbRepo[dbkey].bank;
    const BankAccounts = dbRepo[dbkey].finance_bank_accounts;
    return new Promise(function (resolve, reject) {
      Bank.findAndCountAll({
        limit,
        include: [
          {
            model: BankAccounts,
            as: "Accounts",
            attributes: ["id", "account_number"],
          },
        ],
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

  findBanks: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const Bank = dbRepo[dbkey].bank;
    const BankAccounts = dbRepo[dbkey].finance_bank_accounts;
    return new Promise(function (resolve, reject) {
      Bank.findAndCountAll({
        where: condition,
        limit,
        include: [
          {
            model: BankAccounts,
            as: "Accounts",
            attributes: ["id", "account_number"],
          },
        ],
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

  createBank: async (body, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Bank = dbRepo[dbkey || db.database].bank;
    return new Promise(function (resolve, reject) {
      Bank.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateBank: async () => {
    return null;
  },

  deactivateBank: async (bankId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Bank = dbRepo[dbkey].bank;

    return new Promise(function (resolve, reject) {
      Bank.update({ deactivated: true, dateDeactivated: new Date() }, { where: { id: bankId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteBank: async (bankId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Bank = dbRepo[dbkey].bank;

    return new Promise(function (resolve, reject) {
      Bank.destroy({ where: { id: bankId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = BankDataProvider;
