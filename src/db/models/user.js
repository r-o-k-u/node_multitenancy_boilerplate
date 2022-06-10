"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "comment",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        comment: "comment",
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "comment",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "comment",
      },
      gender: {
        type: DataTypes.ENUM({
          values: ["Male", "Female"],
        }),
        allowNull: false,
        comment: "comment",
      },
      acceptTerms: { type: DataTypes.BOOLEAN },
      verificationToken: { type: DataTypes.STRING },
      verified: { type: DataTypes.DATE },
      resetToken: { type: DataTypes.STRING },
      resetTokenExpires: { type: DataTypes.DATE },
      passwordReset: { type: DataTypes.DATE },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "userGroup",
          key: "id",
        },
        comment: "comment",
      },
      isVerified: {
        type: DataTypes.VIRTUAL,
        get() {
          return !!(this.verified || this.passwordReset);
        },
      },
      deactivated: { type: DataTypes.BOOLEAN },
      dateDeactivated: { type: DataTypes.DATE },
    },
    {
      // disable default timestamp fields (createdAt and updatedAt)
      timestamps: true,
      defaultScope: {
        // exclude password hash by default
        attributes: { exclude: [""] },
      },
      scopes: {
        withHash: { attributes: {} },
      },
    }
  );
  user.associate = function (models) {
    // associations can be defined here
    user.belongsTo(models.user_group, {
      foreignKey: {
        name: "group_id",
        allowNull: true,
      },
      as: "group",
    });
  };
  return user;
};
