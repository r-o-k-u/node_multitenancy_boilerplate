"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable("tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: "comment",
      },
      token: { type: Sequelize.STRING },
      expires: { type: Sequelize.DATE },
      created: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      createdByIp: { type: Sequelize.STRING },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      type: {
        type: Sequelize.ENUM({
          values: ["refresh", "reset", "verification"],
        }),
        allowNull: true,
        comment: "comment",
      },
      revoked: { type: Sequelize.DATE },
      revokedByIp: { type: Sequelize.STRING },
      replacedByToken: { type: Sequelize.STRING },
      isExpired: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable("tokens");
  },
};
