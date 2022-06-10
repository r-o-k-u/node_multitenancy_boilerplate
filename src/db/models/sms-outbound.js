"use strict";
module.exports = (sequelize, DataTypes) => {
  const sms_outbound = sequelize.define(
    "sms_outbound",
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
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
        },
        comment: "comment",
      },
      status: {
        enum: ["unprocessed", "processed", "resent", "failed", "inactive"],
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      deactivated: { type: DataTypes.BOOLEAN },
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
      // disable default timestamp fields (createdAt and updatedAt)
      timestamps: true,
      defaultScope: {
        // exclude password hash by default
        attributes: { exclude: [""] },
      },
      scopes: {},
      freezeTableName: true,
      tableName: "sms_outbound",
    }
  );
  sms_outbound.associate = function (models) {
    // associations can be defined here
    sms_outbound.belongsTo(models.organization, {
      foreignKey: {
        name: "organization_id",
        allowNull: true,
      },
      as: "Organization",
    });
  };
  return sms_outbound;
};
