const { errorHelper } = require("../../utils/index.js");
const { db, tokens } = require("../../config/index");
const dbRepo = require("../../db/models");
const jwt = require("jsonwebtoken");
const { verify } = jwt;

const auth = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) return res.status(401).json(errorHelper("00006", req));

  if (token.includes("Bearer")) token = req.header("Authorization").replace("Bearer ", "");
  try {
    req.user = verify(token, tokens.jwtSecretKey);
    let dbkey = req.tenant_db;
    if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
    const User = dbRepo[dbkey].user;
    const Token = dbRepo[dbkey || db.database].token;
    // validate
    const exists = await User.findAll({
      where: { id: req.user.id, isVerified: true, active: true },
    })
      .then((r) => {
        return r;
      })
      .catch((err) => {
        console.log(err);
        return null;
        //return res.status(500).json(errorHelper("00008", req, err.message));
      });
    // console.log("exists", exists);
    if (!exists) return res.status(400).json(errorHelper("00009", req));

    const tokenExists = await Token.findAll({
      where: { user_id: req.user.id, isActive: true },
    })
      .then((r) => {
        return r;
      })
      .catch((err) => {
        return res.status(500).json(errorHelper("00010", req, err.message));
      });
    if (!tokenExists) return res.status(401).json(errorHelper("00011", req));

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json(errorHelper("00012", req, err.message));
  }
};

module.exports = auth;
