"use strict";
module.exports = (sequelize, DataTypes) => {
  const template = sequelize.define(
    "template",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: " a summary describing the Template",
      },
      type: {
        type: DataTypes.ENUM({
          values: ["EMAIL", "SMS"],
        }),
        allowNull: true,
        comment: "select from either Email or SMS.",
      },
      characters: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "displays the number of characters in the Email/SMS Text field.  Remember that SMS templates cannot exceed the 256 character limit.",
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "the subject of the email for the Template.",
      },
      variables: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: "",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: "comment",
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: " the actual text of the template including any Merge Fields.",
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
      createdBy: {
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
    }
  );
  template.associate = function (models) {
    // associations can be defined here
  };
  return template;
};
