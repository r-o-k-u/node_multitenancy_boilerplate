"use strict";
module.exports = (sequelize, DataTypes) => {
  const sms_settings = sequelize.define(
    "sms_settings",
    {
      sender_id: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      api_key: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      api_secret: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      api_access_key: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "comment",
      },
      provider: {
        enum: ["africas_talking", "system", "twilio", "other"],
        defaultValue: "system",
        type: DataTypes.STRING,
        allowNull: true,
        comment: "comment",
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "organizations",
          key: "id",
        },
        comment: "comment",
      },
      deactivated: { type: DataTypes.BOOLEAN, defaultValue: false },
      dateDeactivated: { type: DataTypes.DATE },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      deactivatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
    },
    {
      //   disable default timestamp fields (createdAt and updatedAt)
      timestamps: false,
      defaultScope: {
        // exclude password hash by default
        attributes: { exclude: [""] },
      },
      scopes: {},
    }
  );
  sms_settings.associate = function (models) {
    // associations can be defined here
  };
  return sms_settings;
};
