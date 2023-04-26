const bcrypt = require('bcrypt')
const validator = require('validator')
const axios = require('axios')


let accessToken = null
const listKey = process.env.LIST_KEY
const refreshToken = process.env.REFRESH_TOKEN
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET


const refreshAccessToken = async () => {

   const data = await axios.post(`https://accounts.zoho.com/oauth/v2/token?client_id=${clientId}&grant_type=refresh_token&client_secret=${clientSecret}&refresh_token=${refreshToken}`)
    accessToken = data.data.access_token
    expirationTime =  Date.now() + (data.data.expires_in * 1000);

}


// middleware to refresh the access token if it has expired
const tokenMiddleware = async (req, res, next) => {
  if (!accessToken || Date.now() >= expirationTime) {
    await refreshAccessToken();
  }
  next();
};





const addToWaitlist = async (req, res) => {
    let { email } = req.body
    let hashedEmail = req.headers['email-hash']
    // validate email
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    // validate hashed email
    const match = await bcrypt.compare(email, hashedEmail);
   res.json({ accessToken, refreshToken})

    // res.send('Success')
}
 
module.exports = {
    addToWaitlist,
    tokenMiddleware
}