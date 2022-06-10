const organizationDataProvider = require("./organizations_dataprovider");

let OrganizationService = {
  getOrganizations: async (dbkey, limit, offset) => {
    let organizations = await organizationDataProvider.getOrganizations(dbkey, limit, offset);
    return organizations;
  },
  findOrganizations: async (dbkey, condition, limit, offset) => {
    let organizations = await organizationDataProvider.findOrganizations(
      dbkey,
      condition,
      limit,
      offset
    );
    return organizations;
  },

  getOrganization: async (organizationId, dbkey) => {
    let organization = await organizationDataProvider.getOrganization(organizationId, dbkey);
    return organization;
  },

  createOrganization: async (body, dbkey) => {
    let organization = await organizationDataProvider.createOrganization(body, dbkey);
    return organization;
  },
  createTenantDB: async (body) => {
    let organization = await organizationDataProvider.createTenantDB(body);
    return organization;
  },

  updateOrganization: async (condition, body, dbkey) => {
    let organization = await organizationDataProvider.updateOrganization(condition, body, dbkey);
    return organization;
  },

  deleteOrganization: async (organizationId, dbkey) => {
    let organization = await organizationDataProvider.deleteOrganization(organizationId, dbkey);
    return organization;
  },
  deactivateOrganization: async (organizationId, dbkey) => {
    let organization = await organizationDataProvider.deactivateOrganization(organizationId, dbkey);
    return organization;
  },
};

module.exports = OrganizationService;
