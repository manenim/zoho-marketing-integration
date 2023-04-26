const bcrypt = require('bcrypt')
const validator = require('validator')
const axios = require('axios')


let accessToken = null
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

    const url = 'https://marketingautomation.zoho.com/api/v1/json/listsubscribe';
    const listKey = process.env.LIST_KEY

    // const listkey = '3zb6c2ec6e5eb01250c4d8907fdaeb777cb51dfa03959765cb3b8b9737a8a4785e';
    const param = {
    resfmt: 'JSON',
    listKey,
    leadinfo: JSON.stringify({
        'First Name': 'mart',
        'Last Name': 'uggh',
        'Lead Email': email,
    }),
    };
    const config = {
    headers: {
        'Authorization': 'Zoho-oauthtoken ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    };

// axios.post(url, param, config)
//   .then(response => {
//     return res.status(200).json( response.data );
//   })
//   .catch(error => {
//     res.json(error);
//   });
    
    try {
        let response = await axios.post(url, param, config)
        let data = response.data
        return res.status(200).json( data );
    } catch (error) {
        return res.status(400).json( error );
    }
    
}
 
module.exports = {
    addToWaitlist,
    tokenMiddleware
}