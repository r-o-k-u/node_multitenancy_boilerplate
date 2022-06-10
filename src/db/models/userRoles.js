module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "user_role",
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
      group_id: {
        references: {
          model: "userGroup",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        type: DataTypes.INTEGER,
        required: false,
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
    }
  );
  UserRole.associate = function (models) {
    // associations can be defined here
    /* UserRole.belongsTo(models.userGroup, {
      foreignKey: {
        name: "group_id",
        allowNull: true,
      },
      as: "user_group",
    }); */
  };
  return UserRole;
};
