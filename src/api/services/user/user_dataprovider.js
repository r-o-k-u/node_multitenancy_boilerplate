const dbRepo = require("../../../db/models");
const { db } = require("../../../config/index");
let UserDataProvider = {
  getUsers: async (dbkey, limit, offset) => {
    const User = dbRepo[dbkey].user;
    const user_group = dbRepo[dbkey].user_group
    const user_role = dbRepo[dbkey].user_role
    return new Promise(function (resolve, reject) {
      User.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: user_group, 
            as: "group",
            attributes: ['id' ],
            include: [
              {
                model: user_role,
                as: "role",
                attributes: ['id' ]
              },
            ]
          },
        ],
        attributes: { exclude: ["password"] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findUsers: async (dbkey, condition, limit, offset) => {
    const User = dbRepo[dbkey].user;
    const user_group = dbRepo[dbkey].user_group
    const user_role = dbRepo[dbkey].user_role
    return new Promise(function (resolve, reject) {
      User.findAndCountAll({
        where: condition,
        include: [
          {
            model: user_group, 
            as: "group",
            attributes: ['id' ],
            include: [
              {
                model: user_role,
                as: "role",
                attributes: ['id' ]
              },
            ]
          },
        ],
        attributes: { exclude: ["password"] },
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  getUser: async (userId, dbkey) => {
    const User = dbRepo[dbkey].user;
    return new Promise(function (resolve, reject) {
      User.findOne({ where: { id: userId }, attributes: { exclude: ["password"] } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createUser: async (body, dbkey) => {
    const User = dbRepo[dbkey].user;
    return new Promise(function (resolve, reject) {
      User.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUser: async (body, condition, dbkey) => {
    const User = dbRepo[dbkey].user;
    return new Promise(function (resolve, reject) {
      User.update(body, { where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteUser: async (condition, dbkey) => {
    const User = dbRepo[dbkey].user;
    return new Promise(function (resolve, reject) {
      User.destroy({ where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deactivateUser: async (condition, dbkey) => {
    const User = dbRepo[dbkey].user;

    return new Promise(function (resolve, reject) {
      User.update(
        { active: false, deactivated: true, dateDeactivated: new Date() },
        { where: { ...condition } }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

let UserRoleDataProvider = {
  getUserRoles: async (dbkey, limit, offset) => {
    const UserRole = dbRepo[dbkey].user_role;
    return new Promise(function (resolve, reject) {
      UserRole.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["password"] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findUserRoles: async (dbkey, condition, limit, offset) => {
    const UserRole = dbRepo[dbkey].user_role;
    return new Promise(function (resolve, reject) {
      UserRole.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  getUserRole: async (user_roleId, dbkey) => {
    const UserRole = dbRepo[dbkey].user_role;
    return new Promise(function (resolve, reject) {
      UserRole.findOne({ where: { id: user_roleId }, attributes: { exclude: ["password"] } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createUserRole: async (body, dbkey) => {
    const UserRole = dbRepo[dbkey].user_role;
    return new Promise(function (resolve, reject) {
      UserRole.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUserRole: async (body, condition, dbkey) => {
    const UserRole = dbRepo[dbkey].user_role;
    return new Promise(function (resolve, reject) {
      UserRole.update(body, { where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteUserRole: async (condition, dbkey) => {
    const UserRole = dbRepo[dbkey].user_role;
    return new Promise(function (resolve, reject) {
      UserRole.destroy({ where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deactivateUserRole: async (condition, dbkey) => {
    const UserRole = dbRepo[dbkey].user_role;

    return new Promise(function (resolve, reject) {
      UserRole.update(
        { active: false, deactivated: true, dateDeactivated: new Date() },
        { where: { ...condition } }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
let UserGroupDataProvider = {
  getUserGroups: async (dbkey, limit, offset) => {
    const UserGroup = dbRepo[dbkey].user_group;
    return new Promise(function (resolve, reject) {
      UserGroup.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["password"] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findUserGroups: async (dbkey, condition, limit, offset) => {
    const UserGroup = dbRepo[dbkey].user_group;
    return new Promise(function (resolve, reject) {
      UserGroup.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  getUserGroup: async (userId, dbkey) => {
    const UserGroup = dbRepo[dbkey].user_group;
    return new Promise(function (resolve, reject) {
      UserGroup.findOne({ where: { id: userId }, attributes: { exclude: ["password"] } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createUserGroup: async (body, dbkey) => {
    const UserGroup = dbRepo[dbkey].user_group;
    return new Promise(function (resolve, reject) {
      UserGroup.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUserGroup: async (body, condition, dbkey) => {
    const UserGroup = dbRepo[dbkey].user_group;
    return new Promise(function (resolve, reject) {
      UserGroup.update(body, { where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteUserGroup: async (condition, dbkey) => {
    const UserGroup = dbRepo[dbkey].user_group;
    return new Promise(function (resolve, reject) {
      UserGroup.destroy({ where: { ...condition } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deactivateUserGroup: async (condition, dbkey) => {
    const UserGroup = dbRepo[dbkey].user_group;

    return new Promise(function (resolve, reject) {
      UserGroup.update(
        { active: false, deactivated: true, dateDeactivated: new Date() },
        { where: { ...condition } }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = { UserDataProvider, UserRoleDataProvider, UserGroupDataProvider };
