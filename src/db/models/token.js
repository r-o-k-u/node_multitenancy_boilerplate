"use strict";
const { tokenTypes } = require("../../config/index");
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define(
    "token",
    {
      token: { type: DataTypes.STRING },
      expires: { type: DataTypes.DATE },
      created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      createdByIp: { type: DataTypes.STRING },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "comment",
      },
      type: {
        type: DataTypes.ENUM({
          values: ["refresh", "reset", "verification"],
        }),
        allowNull: true,
        comment: "comment",
      },
      revoked: { type: DataTypes.DATE },
      revokedByIp: { type: DataTypes.STRING },
      replacedByToken: { type: DataTypes.STRING },
      isExpired: {
        type: DataTypes.VIRTUAL,
      },
      isActive: {
        type: DataTypes.VIRTUAL,
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
    }
  );
  token.associate = function (models) {
    // associations can be defined here
    token.belongsTo(models.user, {
      foreignKey: {
        name: "user_id",
        allowNull: true,
      },
      as: "User",
    });
  };
  return token;
};
