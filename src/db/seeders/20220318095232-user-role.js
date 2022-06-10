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
      "user_roles",
      [
        {
          name: "Administration",
          description: "ls The overall Admin of the system with all rights enables",
          active: true,
          group_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SMS",
          description: "SMS view rights enables",
          active: true,
          group_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Users",
          description: "Users view rights enables",
          active: true,
          group_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Settings",
          description: "Settings view rights enables",
          active: true,
          group_id: 1,
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
    return queryInterface.bulkDelete("user_roles", null, {});
  },
};
