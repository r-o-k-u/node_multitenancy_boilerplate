"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sms_sent", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      schedule_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "comment",
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "comment",
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "comment",
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "comment",
      },
      status: {
        enum: ["unprocessed", "processed", "resent", "failed", "inactive"],
        type: Sequelize.STRING,
        allowNull: false,
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
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sms_sent");
  },
};
