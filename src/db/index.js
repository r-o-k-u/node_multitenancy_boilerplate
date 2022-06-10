"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { db } = require("../config/index");
const modelsDir = path.resolve(__dirname + "/models");
let dbConnector = {
  addSequelizeConnectionToRepo: async (dbRepo, dbkey) => {
    const database = {};
    console.log("addSequelizeConnectionToRepo", dbkey);
    let sequelize;
    if (dbkey === db.database) {
      sequelize = new Sequelize(db.database, db.username, db.password, db);
    } else {
      sequelize = new Sequelize(dbkey, db.username, db.password, db);
    }
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      fs.readdirSync(modelsDir)
        .filter((file) => {
          return file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js";
        })
        .forEach((file) => {
          const model = sequelize["import"](path.join(modelsDir, file));
          database[model.name] = model;
        });

      Object.keys(database).forEach((modelName) => {
        if (database[modelName].associate) {
          database[modelName].associate(database);
        }
      });

      database.sequelize = sequelize;
      database.Sequelize = Sequelize;

      dbRepo[dbkey] = database;
      // console.log("dbRepo", dbRepo);
      return dbRepo;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
};

module.exports = dbConnector;
