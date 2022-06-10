"use strict";
module.exports = (sequelize, DataTypes) => {
  const sms_sent = sequelize.define(
    "sms_sent",
    {
      schedule_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "comment",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      status: {
        enum: ["unprocessed", "processed", "resent", "failed", "inactive"],
        type: DataTypes.STRING,
        allowNull: false,
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
    },

    {
      // disable default timestamp fields (createdAt and updatedAt)
      timestamps: true,
      defaultScope: {
        // exclude password hash by default
        attributes: { exclude: [""] },
      },
      scopes: {},
      freezeTableName: true,
      tableName: "sms_sent",
    }
  );
  sms_sent.associate = function (models) {
    // associations can be defined here
  };
  return sms_sent;
};
