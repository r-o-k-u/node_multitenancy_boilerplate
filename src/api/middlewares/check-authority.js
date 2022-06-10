const { errorHelper } = require("../../utils/index.js");
const { db, tokens } = require("../../config/index");
const dbRepo = require("../../db/models");
const checkSuperAdmin = async function (req, res, next) {
  let dbkey = req.tenant_db;
  if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
  const User = dbRepo[dbkey].user;
  const user_group = dbRepo[dbkey].user_group;
  const user_role = dbRepo[dbkey].user_role;
  const CheckUser = await User.findOne({
    where: { id: req.user.id /* isVerified: true, active: true  */ },
    include: [
      {
        model: user_group,
        as: "group",
        attributes: ["id", "name"],
        include: [
          {
            model: user_role,
            as: "role",
            attributes: ["id"],
          },
        ],
      },
    ],
    attributes: { exclude: ["password"] },
  })
    .then((r) => {
      return r;
    })
    .catch((err) => {
      return res.status(500).json(errorHelper("00016", req, err.message));
      //return res.status(500).json(errorHelper("00008", req, err.message));
    });
  const userGroup = CheckUser.group;
  if (userGroup.name != "Super Admin") return res.status(403).json(errorHelper("00017", req));

  next();
};
const checkAdmin = async function (req, res, next) {
  let dbkey = req.tenant_db;
  if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
  const User = dbRepo[dbkey].user;
  const user_group = dbRepo[dbkey].user_group;
  const user_role = dbRepo[dbkey].user_role;
  const CheckUser = await User.findOne({
    where: { id: req.user.id /* isVerified: true, active: true  */ },
    include: [
      {
        model: user_group,
        as: "group",
        attributes: ["id", "name"],
        include: [
          {
            model: user_role,
            as: "role",
            attributes: ["id"],
          },
        ],
      },
    ],
    attributes: { exclude: ["password"] },
  })
    .then((r) => {
      return r;
    })
    .catch((err) => {
      return res.status(500).json(errorHelper("00016", req, err.message));
      //return res.status(500).json(errorHelper("00008", req, err.message));
    });
  const userGroup = CheckUser.group;
  if (userGroup.name != "Admin") return res.status(403).json(errorHelper("00017", req));

  next();
};
const checkFinance = async function (req, res, next) {
  let dbkey = req.tenant_db;
  if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
  const User = dbRepo[dbkey].user;
  const CheckUser = await User.findAll({
    where: { id: req.user.id, isVerified: true, active: true },
  })
    .then((r) => {
      return r;
    })
    .catch((err) => {
      return res.status(500).json(errorHelper("00016", req, err.message));
      //return res.status(500).json(errorHelper("00008", req, err.message));
    });

  const userGroup = CheckUser.group;
  if (userGroup.name != "Finance") return res.status(403).json(errorHelper("00017", req));

  next();
};
const checkStaff = async function (req, res, next) {
  let dbkey = req.tenant_db;
  if (!dbkey) return response.status(400).send(errorHelper("00001", request)).end();
  const User = dbRepo[dbkey].user;
  const CheckUser = await User.findAll({
    where: { id: req.user.id, isVerified: true, active: true },
  })
    .then((r) => {
      return r;
    })
    .catch((err) => {
      return res.status(500).json(errorHelper("00016", req, err.message));
      //return res.status(500).json(errorHelper("00008", req, err.message));
    });

  const userGroup = CheckUser.group;
  if (userGroup.name != "User") return res.status(403).json(errorHelper("00017", req));

  next();
};

module.exports = {
  checkSuperAdmin,
  checkAdmin,
  checkFinance,
  checkStaff,
};
