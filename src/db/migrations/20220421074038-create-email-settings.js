"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("email_settings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      smtp_host: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      smtp_username: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      smtp_password: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      reply_to: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      api_key: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      api_secret: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      api_access_key: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "organizations",
          key: "id",
        },
        comment: "comment",
      },
      deactivated: { type: Sequelize.BOOLEAN, defaultValue: false },
      dateDeactivated: { type: Sequelize.DATE },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      deactivatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("email_settings");
  },
};
