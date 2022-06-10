"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("templates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "comment",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: " a summary describing the Template",
      },
      type: {
        type: Sequelize.ENUM({
          values: ["EMAIL", "SMS"],
        }),
        allowNull: true,
        comment: "select from either Email or SMS.",
      },
      characters: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:
          "displays the number of characters in the Email/SMS Text field.  Remember that SMS templates cannot exceed the 256 character limit.",
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "the subject of the email for the Template.",
      },
      variables: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: "",
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: "comment",
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: " the actual text of the template including any Merge Fields.",
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
    await queryInterface.dropTable("templates");
  },
};
