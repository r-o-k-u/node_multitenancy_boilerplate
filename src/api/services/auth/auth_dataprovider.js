const dbRepo = require("../../../db/models");
const { db, tokens } = require("../../../config/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { sendEmail, sendSms } = require("../../../utils/index");
const OrganizationDataProvider = require("../organization/organizations_dataprovider");

async function authenticate({ email, password, ipAddress }, dbkey) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const User = dbRepo[dbkey || db.database].user;
  const Token = dbRepo[dbkey || db.database].token;
  const user_group = dbRepo[dbkey].user_group;
  const user_role = dbRepo[dbkey].user_role;
  const organization = dbRepo[dbkey].organization;

  const account = await User.scope("withHash").findOne({
    where: { email },
    include: [
      {
        model: user_group,
        as: "group",
        attributes: ["id", "name"],
        include: [
          {
            model: user_role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
  const isMatch = bcrypt.compareSync(password, account.passwordHash);
  if (!account || !isMatch) {
    //throw "Email or password is incorrect";
    return [];
  }
  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(account);
  const refreshToken = generateRefreshToken(account, ipAddress);
  let token_payload = {
    token: refreshToken.token,
    expires: refreshToken.expires,
    createdByIp: refreshToken.createdByIp,
    user_id: account.id,
    type: "refresh",
    isActive: true,
  };
  await Token.create(token_payload).catch((err) => console.log("err", err));

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

async function refreshToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);
  const account = await refreshToken.getAccount();

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(account, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(account);

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
}

async function revokeToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}

async function register(params, dbkey, origin) {
  !origin ? (origin = "https://qwerty.co.ke") : "";

  try {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const User = dbRepo[dbkey].user;
    // validate
    const initialUser = await User.findAll({ where: { email: params.email } })
      .then((r) => {
        return r;
      })
      .catch((err) => {
        return null;
      });
    if (initialUser.length > 0) {
      // send already registered error in email to prevent account enumeration
      return await sendAlreadyRegisteredEmail(params.email, origin);
    }
    // create account object
    const account = { ...params };
    // first registered account is an admin
    const isFirstAccount = initialUser.length === 0;
    account.role = isFirstAccount ? "Admin" : "user";
    account.verificationToken = randomTokenString();
    params.password
      ? (params.password = params.password)
      : (params.password = Math.floor(1000 + Math.random() * 9000).toString());
    // hash password
    account.passwordHash = await hash(params.password);

    // save account
    return new Promise(function (resolve, reject) {
      User.create(account)
        .then(async (data) => {
          // send email
          await sendVerificationEmail(account, origin);
          if (account.phone) {
            const message = `Welcome to Qwerty systems api , Your password is ${params.password}`;
            await sendSms({ recipients: [{ phoneNo: account.phone }], message }, {});
            /* const sms_body = {message :message ,
          contact: body.phone,
          type:'direct',
          schedule_date: moment().format('YYYY-MM-DD HH:mm:ss')} 
            sms_body.status ? "" :sms_body.status = "unprocessed"
          let sms = await smsService.createSms(sms_body, dbkey); */
          }
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (error) {
    console.log("error", error);
  }
}
async function getRefreshToken(token) {
  const refreshToken = await db.RefreshToken.findOne({ where: { token } });
  if (!refreshToken || !refreshToken.isActive) throw "Invalid token";
  return refreshToken;
}

async function hash(password) {
  return await bcrypt.hash(password, 10);
}

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ sub: account.id, id: account.id }, tokens.jwtSecretKey, { expiresIn: "24h" });
}

function generateRefreshToken(account, ipAddress) {
  // create a refresh token that expires in 7 days
  return {
    accountId: account.id,
    token: jwt.sign({ sub: account.id, id: account.id }, tokens.refreshTokenSecretKey, {
      expiresIn: "15m",
    }),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  };
}
function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}
function basicDetails(account) {
  const {
    id,
    title,
    firstName,
    lastName,
    email,
    role,
    gender,
    created,
    updated,
    isVerified,
    group,
  } = account;
  return {
    id,
    title,
    firstName,
    lastName,
    email,
    role,
    gender,
    created,
    updated,
    isVerified,
    group,
  };
}
async function verifyEmail({ token }) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const User = dbRepo[dbkey || db.database].user;

  const account = await User.findAll({ where: { verificationToken: token } });

  if (!account) throw "Verification failed";

  account.verified = Date.now();
  account.verificationToken = null;
  await account.save();
}

async function forgotPassword({ email }, origin) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const User = dbRepo[dbkey || db.database].user;
  const account = await User.findAll({ where: { email } });

  // always return ok response to prevent email enumeration
  if (!account) return;
  account_payload = {
    resetToken: randomTokenString(),
    resetTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  // create reset token that expires after 24 hours
  await User.update(account_payload, { where: { id: account.id } })
    .then(async (data) => {
      // send email
      await sendPasswordResetEmail(account, origin);
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
}

async function validateResetToken({ token }) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const User = dbRepo[dbkey || db.database].user;
  const account = await User.findAll({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!account) throw "Invalid token";

  return account;
}

async function resetPassword({ token, password }) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const User = dbRepo[dbkey || db.database].user;
  const account = await validateResetToken({ token });

  // update password and remove reset token
  account.passwordHash = await hash(password);
  account.passwordReset = Date.now();
  account.resetToken = null;
  await User.update(account, { where: { id: account.id } })
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
}

async function sendVerificationEmail(account, origin) {
  origin == null ? origin == "test.com" : "";
  let message;
  if (origin) {
    const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
    message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
  }

  await sendEmail(
    account.email,
    "Sign-up Verification API - Verify Email",
    `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`,
    "en",
    " ",
    null,
    null
  );
}

async function sendAlreadyRegisteredEmail(email, origin) {
  let message;
  origin == null ? origin == "test.com" : "";
  if (origin) {
    message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
  } else {
    message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
  }

  await sendEmail({
    to: email,
    subject: "Sign-up Verification API - Email Already Registered",
    html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
  });
}

async function sendPasswordResetEmail(account, origin) {
  origin == null ? origin == "test.com" : "";
  let message;
  if (origin) {
    const resetUrl = `${origin}/account/reset-password?token=${account.resetToken}`;
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: "Sign-up Verification API - Reset Password",
    html: `<h4>Reset Password Email</h4>
               ${message}`,
  });
}
async function logOut(condition, dbkey) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const Token = dbRepo[dbkey || db.database].token;
  return await Token.update({ revoked: Date.now(), expires: Date.now() }, { where: condition })
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return res.status(500).json(errorHelper("00049", req, err.message));
    });
}
async function updateToken(condition, payload, dbkey) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const Token = dbRepo[dbkey || db.database].token;

  // create reset token that expires after 24 hours
  return await Token.update(payload, { where: condition })
    .then(async (data) => {
      return data;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
}
async function getToken(condition, dbkey) {
  dbkey == null ? (dbkey = db.database) : dbkey;
  const Token = dbRepo[dbkey || db.database].token;
  const account = await Token.findAll(condition);

  // always return ok response to prevent email enumeration
  if (!account) return;
  return account;
}
let AuthenticationDataProvider = {
  authenticate,
  refreshToken,
  revokeToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  logOut,
  updateToken,
  getToken,
};

module.exports = AuthenticationDataProvider;
