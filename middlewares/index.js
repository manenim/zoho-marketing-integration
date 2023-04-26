const { refreshAccessToken } = require("../utils");


let accessToken = null
const refreshToken = process.env.REFRESH_TOKEN
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const zohoUrl = process.env.ZOHO_AUTH_URL

const checkTokenExpiry = async (req, res, next) => {
  if (!accessToken || Date.now() >= expirationTime) {
    await refreshAccessToken();
  }
  next();
};


module.exports = { checkTokenExpiry };