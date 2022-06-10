"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

var cors = require("cors");
const { stderrStream, stdoutStream } = require("./utils/logger/morgan");
const { prefix } = require("./config/index");
const routes = require("./api/routes/index");

const app = express();
/**
 * Helmet helps to secure Express apps by setting various HTTP headers.
 */
app.use(helmet());

app.use(cors());

/**
 * Get NODE_ENV from environment and store in Express.
 */
app.set("env", process.env.NODE_ENV);

/**
 * When running Express app behind a proxy we need to detect client IP address correctly.
 * For NGINX the following must be configured 'proxy_set_header X-Forwarded-For $remote_addr;'
 * @link http://expressjs.com/en/guide/behind-proxies.html
 */
app.set("trust proxy", true);

/**
 * Morgan logger
 */
app.use(stderrStream, stdoutStream);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.disable("x-powered-by");
app.disable("etag");

app.use(express.static("uploads"));

/**
 * Routes
 */
app.use(prefix, routes);
app.get("/", (_req, res) => {
  return res
    .status(200)
    .json({
      resultMessage: {
        en: "Project is successfully working...",
        sw: "Mradi umezishwa na mafinikio...",
      },
      resultCode: "00004",
    })
    .end();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Content-Security-Policy-Report-Only", "default-src: https:");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT POST PATCH DELETE GET");
    return res.status(200).json({});
  }
  next();
});
app.use((_req, _res, next) => {
  const error = new Error("Endpoint could not be found!");
  error.status = 404;
  next(error);
});
app.use((error, req, res, _next) => {
  res.status(error.status || 500);
  let resultCode = "00015";
  let level = "External Error";
  if (error.status === 500) {
    resultCode = "00013";
    level = "Server Error";
  } else if (error.status === 404) {
    resultCode = "00014";
    level = "Client Error";
  }
  return res.json({
    resultMessage: {
      en: error.message,
      sw: error.message,
    },
    resultCode: resultCode,
  });
});

module.exports = app;
//
