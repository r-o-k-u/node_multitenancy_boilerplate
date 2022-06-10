const pkg = require("jsonwebtoken");
const { sign } = pkg;
const { tokens } = require("../../config/index.js");
function signAccessToken(userId) {
  const accessToken = sign({ id: userId }, tokens.jwtSecretKey, {
    expiresIn: "1h",
  });
  return accessToken;
}
function signRefreshToken(userId) {
  const refreshToken = sign(
    { id: userId },
    tokens.refreshTokenSecretKey || "sscsscscsdcsdcscsscsc",
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
}
function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { id: userId, code: confirmCode },
    token.jwtSecretKey || "cscscscscdgefhboiveivnme0v9envev",
    {
      expiresIn: "5m",
    }
  );
  return confirmCodeToken;
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  signConfirmCodeToken,
};
