"use strict";
const short = require("short-uuid");
const bcrypt = require("bcryptjs");
const pwd = bcrypt.hashSync("admin", 10);
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@qwerty.co.ke",
          firstName: "Admin",
          lastName: "user",
          group_id: "1",
          gender: "Male",
          phone: "254743411402",
          passwordHash: pwd,
          isSuperAdmin: true,
          active: true,
          verified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("users", null, {});
  },
};
