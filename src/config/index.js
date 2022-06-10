const dotenv = require("dotenv");
dotenv.config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const {
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  EMAIL_FROM,
  JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_REFRESH_EXPIRATION_DAYS,
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  SMS_API_KEY,
  SMS_CLIENT_ID,
  SMS_SENDER_ID,
  SMS_ACCESS_KEY,
  AMQP_SERVER,
  I_AND_M_USERNAME,
  I_AND_M_PASSWORD,
} = process.env;

const port = PORT || 3232;
const prefix = "/api/v1";
const specs = "/docs";
const enableLogging = true;
const companyContactEmail = "contact@qwerty.co.ke";
const defaultConfig = {
  dialect: "postgres",
  /*  timezone: '+03:00', */
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT) /* 
  define: {
    paranoid: true,
  }, */,
};

const db = {
  ...defaultConfig,
  logging: false,
};

const development = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const test = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const production = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  dialectOptions: {
    bigNumberStrings: true,
    /* ssl: {
      ca: fs.readFileSync(__dirname + '/config/')
    } */
  },
};
const tokens = {
  jwtSecretKey: JWT_SECRET_KEY,
  accessExpirationMinutes: JWT_ACCESS_EXPIRATION_MINUTES,
  refreshExpirationDays: JWT_REFRESH_EXPIRATION_DAYS,
  resetPasswordExpirationMinutes: JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  verifyEmailExpirationMinutes: JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  refreshTokenSecretKey: REFRESH_TOKEN_SECRET_KEY,
};
const email = {
  smtp: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  },
  from: EMAIL_FROM || companyContactEmail,
};
const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};
const allRoles = {
  user: [],
  admin: ["getUsers", "manageUsers"],
};
const languages = {
  en: "en",
  sw: "sw",
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const TokenStoredInDb = [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL];

const URI = "https://qwerty.co.ke/api/";

module.exports = {
  port,
  tokens,
  email,
  prefix,
  specs,
  enableLogging,
  db,
  production,
  test,
  development,
  tokenTypes,
  TokenStoredInDb,
  roles,
  roleRights,
  languages,
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMS_API_KEY,
  SMS_CLIENT_ID,
  SMS_SENDER_ID,
  SMS_ACCESS_KEY,
  AMQP_SERVER,
  URI,
  I_AND_M_USERNAME,
  I_AND_M_PASSWORD,
};
