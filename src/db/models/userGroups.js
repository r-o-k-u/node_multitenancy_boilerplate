module.exports = (sequelize, DataTypes) => {
  const user_group = sequelize.define(
    "user_group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comment",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "comment",
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
      scopes: {},
    }
  );
  user_group.associate = function (models) {
    // associations can be defined here
    /* UserGroup.hasMany(models.users, {
      foreignKey: {
        name: "group_id",
        allowNull: true,
      },
      as: "user_group",
    }); */
    /*  UserGroup.hasMany(models.Staff, {
      foreignKey: {
        name: "group_id",
        allowNull: true,
      },
      as: "user_group",
    }); */
    user_group.hasMany(models.user_role, {
      foreignKey: {
        name: "group_id",
        allowNull: true,
      },
      as: "role",
    });
  };
  return user_group;
};
