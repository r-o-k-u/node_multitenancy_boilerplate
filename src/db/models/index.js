'use strict';
const dbConnector = require('../index');
const {db} = require('../../config/index');

let dbRepo = {};
dbConnector.addSequelizeConnectionToRepo(dbRepo, db.database);

module.exports = dbRepo;
