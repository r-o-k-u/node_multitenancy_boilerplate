const authenticationDataProvider = require("./auth_dataprovider");

let AuthenticationService = {
  registerUser: async (payload, dbkey, origin) => {
    console.log("test payload", payload);
    let organizations = await authenticationDataProvider.register(payload, dbkey, origin);
    return organizations;
  },
  authenticate: async ({ email, password, ipAddress }, dbkey) => {
    let payload = { email, password, ipAddress };
    console.log("authenticate  service dbkey", dbkey);
    let authentication = await authenticationDataProvider.authenticate(payload, dbkey);
    return authentication;
  },
  logout: async (payload, dbkey) => {
    let authentication = await authenticationDataProvider.logOut(payload, dbkey);
    return authentication;
  },
  updateToken: async (payload, dbkey) => {
    let authentication = await authenticationDataProvider.updateToken(payload, dbkey);
    return authentication;
  },
  getToken: async (payload, dbkey) => {
    let authentication = await authenticationDataProvider.getToken(payload, dbkey);
    return authentication;
  },
};

module.exports = AuthenticationService;
