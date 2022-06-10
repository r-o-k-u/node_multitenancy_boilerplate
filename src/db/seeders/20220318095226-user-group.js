"use strict";
const short = require("short-uuid");
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
      "user_groups",
      [
        {
          name: "Super Admin",
          description: "ls The overall Admin of the system with all rights enables",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin",
          description: "ls The Admin with limited administration rights enables",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Guest",
          description: "ls The Guest with limited  rights enables",
          active: true,
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
    return queryInterface.bulkDelete("user_groups", null, {});
  },
};
