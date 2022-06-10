"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: "comment",
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: "comment",
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      gender: {
        type: Sequelize.ENUM({
          values: ["Male", "Female"],
        }),
        allowNull: false,
        comment: "comment",
      },
      email: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: "comment",
      },
      phone: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING,
        comment: "comment",
      },
      isSuperAdmin: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: "comment",
      },
      acceptTerms: { type: Sequelize.BOOLEAN },
      verificationToken: { type: Sequelize.STRING },
      verified: { type: Sequelize.DATE },
      resetToken: { type: Sequelize.STRING },
      resetTokenExpires: { type: Sequelize.DATE },
      passwordReset: { type: Sequelize.DATE },
      active: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      group_id: {
        references: {
          model: "user_groups",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
      },
      active: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable("users");
  },
};
