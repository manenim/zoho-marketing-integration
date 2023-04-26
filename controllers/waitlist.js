const bcrypt = require('bcrypt')
const validator = require('validator')
const axios = require('axios')
const { refreshAccessToken } = require('../utils')

// DECLARING VARIABLES 
let accessToken = null
const refreshToken = process.env.REFRESH_TOKEN
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const zohoUrl = process.env.ZOHO_AUTH_URL


// get access token
// const refreshAccessToken = async () => {
//    const data = await axios.post(`${zohoUrl}?client_id=${clientId}&grant_type=refresh_token&client_secret=${clientSecret}&refresh_token=${refreshToken}`)
//     accessToken = data.data.access_token
//     expirationTime =  Date.now() + (data.data.expires_in * 1000);
// }

// await refreshAccessToken()


// middleware to refresh the access token if it has expired
// const tokenMiddleware = async (req, res, next) => {
//   if (!accessToken || Date.now() >= expirationTime) {
//     await refreshAccessToken();
//   }
//   next();
// };




// add to waitlist (lambda function)
const addToWaitlist = async (req, res) => {

    let { email } = req.body
    let hashedEmail = req.headers['email-hash']
    let id = req.headers['x-request-id']


    // validate email address
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    // decrypt and compare hashed email to email address in request body
    // const match = await bcrypt.compare(email, hashedEmail);
    const match = await bcrypt.compare(`${id}|${email}`, `${hashedEmail}`)
    
    // if hashed email is not valid, return error
    if (!match) {
        return res.status(403).send('You are not authorized to access this resource');
    }

    //step 0: if record already exists, i.e email == email && status == successful, return user already subscribed
    // step 1: create record on dynamoDB; id, request_id, email, status (enum: initiated, successful. failed) created_at, updated_at and deleted_at
    // step 2: get token
    // step 3: add to waitlist
    // step 4: update record on db; if successs, status = successful, else status = failed

    // if email is valid, add to waitlist
    const url = process.env.SUBSCRIBE_URL;
    const listKey = process.env.LIST_KEY
    const param = {
    resfmt: 'JSON',
    listKey,
    leadinfo: JSON.stringify({
        'Lead Email': email,
    }),
    };
    const config = {
    headers: {
        'Authorization': 'Zoho-oauthtoken ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    };

    
    try {

        let response = await axios.post(url, param, config)
        let data = response.data
        // return res.status(200).json();
        {
            if (data.status === 'success') { 
                return res.status(201).json({
                    "status": true,
                    "message": data.message,
                    "data": {}
                });
            }
        }
        
    } catch (error) {

        return res.json({
            "status": false,
            "message": error.message || JSON.stringify(error),
            "data": {}
        });
        
    }
    
}
 
module.exports = {
    addToWaitlist,   
}