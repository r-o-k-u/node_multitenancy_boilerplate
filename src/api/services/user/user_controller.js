const {UserService , UserRoleService , UserGroupService } = require('./user_service');
const responder = require('../../../utils/responder');
const common = require('../../../utils/common');
const errorHelper = require("../../../utils/helpers/error-helper");
let UserController = {

  getUsers: async (request, response, next) => {
    try {
      let users
      let userData
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        
        const { page, size, role , active ,id} = request.query;
        
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
        
        users = await UserService.findUsers(dbkey , condition , limit , offset); 
        userData = common.getPagingData(users, page, limit);
      }else {
        const { page, size} = request.query;
        const { limit, offset } = common.getPagination(page, size);        
        users = await UserService.getUsers(dbkey ,limit , offset); 
        userData = common.getPagingData(users, page, limit);
        
      }
      
      responder.sendResponse(response, 200, "success",userData, "Users retrieved successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  getUser: async (request, response, next) => {
    try {
      let users
      let userData
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        
        const { id} = request.query;
        
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
        
        users = await UserService.findUsers(dbkey , condition , limit , offset); 
        userData = common.getPagingData(users, page, limit);
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      responder.sendResponse(response, 200, "success",  "User retrieved successfully.");
    } catch (error) {
      return next(error);
    }
  },

  createUser: async (request, response, next) => {
    try {
      let body = request.body;
      /* if(!body.password) {
        body.password = Math.floor(1000 + Math.random() * 9000);
      }
      body.active ? "" : body.active = 1
      let user = await UserService.createUser(body, dbkey);     */ 
      responder.sendResponse(response, 200, "success", user, "This endpoint has been disabled.");
    } catch (error) {
      
      return next(error);
    }
  },

  updateUser: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let payload  = request.body
      user = await UserService.updateUser(payload, condition ,  dbkey ); 
      responder.sendResponse(response, 200, "success", user, "User updated successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  deleteUser: async (request, response, next) => { 
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let user = await UserService.deleteUser(condition, dbkey); 
      responder.sendResponse(response, 200, "success",user, "User deleted successfully.");
    } catch (error) {
      return next(error); 
    }
  },
  deactivateUser: async (request, response, next) => { 
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let user = await UserService.deactivateUser(condition, dbkey); 
      responder.sendResponse(response, 200, "success", user,  "User deactivated successfully.");
    } catch (error) {
      return next(error); 
    }
  }

};

let UserRoleController = {

  getUserRoles: async (request, response, next) => {
    try {
      let userRoles
      let userRoleData
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        
        const { page, size, role , active ,id} = request.query;
        
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
        
        userRoles = await UserRoleService.findUserRoles(dbkey , condition , limit , offset); 
        userRoleData = common.getPagingData(userRoles, page, limit);
      }else {
        const { page, size} = request.query;
        const { limit, offset } = common.getPagination(page, size);        
        userRoles = await UserRoleService.getUserRoles(dbkey ,limit , offset); 
        userRoleData = common.getPagingData(userRoles, page, limit);
        
      }
      
      responder.sendResponse(response, 200, "success",userRoleData, "UserRoles retrieved successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  getUserRole: async (request, response, next) => {
    try {
      let userRoles
      let userRoleData
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        
        const { id} = request.query;
        
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
        
        userRoles = await UserRoleService.findUserRoles(dbkey , condition , limit , offset); 
        userRoleData = common.getPagingData(userRoles, page, limit);
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      responder.sendResponse(response, 200, "success",  "UserRole retrieved successfully.");
    } catch (error) {
      return next(error);
    }
  },

  createUserRole: async (request, response, next) => {
    try {
      let body = request.body;
      body.active ? "" : body.active = 1
      let userRole = await UserRoleService.createUserRole(body, dbkey);     
      responder.sendResponse(response, 200, "success", userRole, "UserRole deleted successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  updateUserRole: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let payload  = request.body
      userRole = await UserRoleService.updateUserRole(payload, condition ,  dbkey ); 
      responder.sendResponse(response, 200, "success", userRole, "UserRole updated successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  deleteUserRole: async (request, response, next) => { 
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let userRole = await UserRoleService.deleteUserRole(condition, dbkey); 
      responder.sendResponse(response, 200, "success",userRole, "UserRole deleted successfully.");
    } catch (error) {
      return next(error); 
    }
  },
  deactivateUserRole: async (request, response, next) => { 
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let userRole = await UserRoleService.deactivateUserRole(condition, dbkey); 
      responder.sendResponse(response, 200, "success", userRole,  "UserRole deactivated successfully.");
    } catch (error) {
      return next(error); 
    }
  }

};

let UserGroupController = {

  getUserGroups: async (request, response, next) => {
    try {
      let userGroups
      let userGroupData
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        
        const { page, size, role , active ,id} = request.query;
        
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
        
        userGroups = await UserGroupService.findUserGroups(dbkey , condition , limit , offset); 
        userGroupData = common.getPagingData(userGroups, page, limit);
      }else {
        const { page, size} = request.query;
        const { limit, offset } = common.getPagination(page, size);        
        userGroups = await UserGroupService.getUserGroups(dbkey ,limit , offset); 
        userGroupData = common.getPagingData(userGroups, page, limit);
        
      }
      
      responder.sendResponse(response, 200, "success",userGroupData, "UserGroups retrieved successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  getUserGroup: async (request, response, next) => {
    try {
      let userGroups
      let userGroupData
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        
        const { id} = request.query;
        
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
        
        userGroups = await UserGroupService.findUserGroups(dbkey , condition , limit , offset); 
        userGroupData = common.getPagingData(userGroups, page, limit);
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      responder.sendResponse(response, 200, "success",  "UserGroup retrieved successfully.");
    } catch (error) {
      return next(error);
    }
  },

  createUserGroup: async (request, response, next) => {
    try {
      let body = request.body;
      /* if(!body.password) {
        body.password = Math.floor(1000 + Math.random() * 9000);
      }
      body.active ? "" : body.active = 1
      let userGroup = await UserGroupService.createUserGroup(body, dbkey);     */ 
      responder.sendResponse(response, 200, "success", userGroup, "UserGroup deleted successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  updateUserGroup: async (request, response, next) => {
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let payload  = request.body
      userGroup = await UserGroupService.updateUserGroup(payload, condition ,  dbkey ); 
      responder.sendResponse(response, 200, "success", userGroup, "UserGroup updated successfully.");
    } catch (error) {
      
      return next(error);
    }
  },

  deleteUserGroup: async (request, response, next) => { 
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let userGroup = await UserGroupService.deleteUserGroup(condition, dbkey); 
      responder.sendResponse(response, 200, "success",userGroup, "UserGroup deleted successfully.");
    } catch (error) {
      return next(error); 
    }
  },
  deactivateUserGroup: async (request, response, next) => { 
    try {
      let dbkey = request.tenant_db;
      if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
      if(Object.keys(request.query).length > 0) {
        const { id} = request.query;
        var condition =  {}
        id ?   condition.id = id  : null;
        
        const { limit, offset } = common.getPagination(page, size);
      }else {
        return response.status(400).send(errorHelper("00001", request)).end();
      }
      let userGroup = await UserGroupService.deactivateUserGroup(condition, dbkey); 
      responder.sendResponse(response, 200, "success", userGroup,  "UserGroup deactivated successfully.");
    } catch (error) {
      return next(error); 
    }
  }

};

module.exports = {UserController , UserGroupController , UserRoleController };
