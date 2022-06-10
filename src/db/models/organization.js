"use strict";
module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define(
    "organization",
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      domain: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      logo: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      owner: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      postal_address: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      physical_location: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      accounts_office_phone: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      reply_to_email: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      tenant_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "comment",
      },
      deactivated: { type: DataTypes.BOOLEAN, default: false },
      dateDeactivated: { type: DataTypes.DATE },
    },
    {
      // disable default timestamp fields (createdAt and updatedAt)
      timestamps: true,
      defaultScope: {
        // exclude password hash by default
        attributes: { exclude: [""] },
      },
      scopes: {},
    }
  );
  organization.associate = function (models) {
    // associations can be defined here
  };
  return organization;
};
