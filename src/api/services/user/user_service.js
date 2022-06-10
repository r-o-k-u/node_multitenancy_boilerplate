const {UserDataProvider , UserRoleDataProvider , UserGroupDataProvider} = require('./user_dataprovider');

let UserService = {

  getUsers: async(dbkey , limit , offset) => {
    let users = await UserDataProvider.getUsers(dbkey , limit , offset); ;
    return users;
  },
  findUsers: async(dbkey , condition , limit , offset) => {
    
    let users = await UserDataProvider.findUsers(dbkey , condition , limit , offset); 
    return users;
  },

  getUser: async(userId, dbkey) => {
    let user = await UserDataProvider.getUser(userId, dbkey);
    return user;
  },

  createUser: async(body, dbkey) => {
    let user = await UserDataProvider.createUser(body, dbkey);
    return user;
  },

  updateUser: async(body , condition, dbkey) => {
    let user = await UserDataProvider.updateUser(body , condition, dbkey);
    return user;
  },

  deleteUser: async(userId, dbkey) => {
    let user = await UserDataProvider.deleteUser(userId, dbkey);
    return user;
  },
  deactivateUser: async(condition, dbkey) => {
    let user = await UserDataProvider.deactivateUser(condition, dbkey);
    return user;
  }

};

let UserGroupService = {

  getUserGroups: async(dbkey , limit , offset) => {
    let user_groups = await UserGroupDataProvider.getUserGroups(dbkey , limit , offset); ;
    return user_groups;
  },
  findUserGroups: async(dbkey , condition , limit , offset) => {
    
    let user_groups = await UserGroupDataProvider.findUserGroups(dbkey , condition , limit , offset); 
    return user_groups;
  },

  getUserGroup: async(user_groupId, dbkey) => {
    let user_group = await UserGroupDataProvider.getUserGroup(user_groupId, dbkey);
    return user_group;
  },

  createUserGroup: async(body, dbkey) => {
    let user_group = await UserGroupDataProvider.createUserGroup(body, dbkey);
    return user_group;
  },

  updateUserGroup: async(body , condition, dbkey) => {
    let user_group = await UserGroupDataProvider.updateUserGroup(body , condition, dbkey);
    return user_group;
  },

  deleteUserGroup: async(user_groupId, dbkey) => {
    let user_group = await UserGroupDataProvider.deleteUserGroup(user_groupId, dbkey);
    return user_group;
  },
  deactivateUserGroup: async(condition, dbkey) => {
    let user_group = await UserGroupDataProvider.deactivateUserGroup(condition, dbkey);
    return user_group;
  }

};

let UserRoleService = {

  getUserRoles: async(dbkey , limit , offset) => {
    let userRoles = await UserRoleDataProvider.getUserRoles(dbkey , limit , offset); ;
    return userRoles;
  },
  findUserRoles: async(dbkey , condition , limit , offset) => {
    
    let userRoles = await UserRoleDataProvider.findUserRoles(dbkey , condition , limit , offset); 
    return userRoles;
  },

  getUserRole: async(userRoleId, dbkey) => {
    let userRole = await UserRoleDataProvider.getUserRole(userRoleId, dbkey);
    return userRole;
  },

  createUserRole: async(body, dbkey) => {
    let userRole = await UserRoleDataProvider.createUserRole(body, dbkey);
    return userRole;
  },

  updateUserRole: async(body , condition, dbkey) => {
    let userRole = await UserRoleDataProvider.updateUserRole(body , condition, dbkey);
    return userRole;
  },

  deleteUserRole: async(userRoleId, dbkey) => {
    let userRole = await UserRoleDataProvider.deleteUserRole(userRoleId, dbkey);
    return userRole;
  },
  deactivateUserRole: async(condition, dbkey) => {
    let userRole = await UserRoleDataProvider.deactivateUserRole(condition, dbkey);
    return userRole;
  }

};
module.exports = {UserService , UserGroupService  , UserRoleService};
