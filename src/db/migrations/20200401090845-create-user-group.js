"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: "comment",
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: "comment",
      },
      deactivated: { type: Sequelize.BOOLEAN, defaultValue: false },
      dateDeactivated: { type: Sequelize.DATE },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user_groups");
  },
};
