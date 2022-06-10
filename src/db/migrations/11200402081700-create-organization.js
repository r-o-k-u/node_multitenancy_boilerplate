"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("organizations", {
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
      domain: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      logo: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      owner: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      postal_address: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      physical_location: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      accounts_office_phone: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      reply_to_email: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      tenant_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "comment",
      },
      deactivated: { type: Sequelize.BOOLEAN, default: false },
      dateDeactivated: { type: Sequelize.DATE },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("organizations");
  },
};
