"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sms_settings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sender_id: {
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
      provider: {
        enum: ["africas_talking", "system", "twilio", "other"],
        defaultValue: "system",
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable("sms_settings");
  },
};
