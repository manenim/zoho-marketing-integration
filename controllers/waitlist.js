import axios from 'axios'
import bcrypt from 'bcrypt'
import validator from 'validator'


let accessToken = null;
let refreshToken = process.env.REFRESH_TOKEN;
let expirationTime = 0;


const refreshAccessToken = async () => {

   const data = await axios.post('https://accounts.zoho.com/oauth/v2/token?client_id=1000.7CAW02T2H0JPSC5ZRJHVLV9DPBX4ZT&grant_type=refresh_token&client_secret=51ca70b87951da92d8d632458db19e71d4c92ce321&refresh_token=1000.54ba6ad132159765fb73d78172dda143.35a4bd27181afcf571c789254405cf61')
    accessToken = data.data.access_token
    expirationTime =  Date.now() + (data.data.expires_in * 1000);

}

// middleware to refresh the access token if it has expired
export const tokenMiddleware = async (req, res, next) => {
  if (!accessToken || Date.now() >= expirationTime) {
    await refreshAccessToken();
  }
  next();
};


export const addProspect = async (req, res) => {
    let { email } = req.body
    let hashedEmail = req.headers['email-hash']

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }
    const match = await bcrypt.compare(email, hashedEmail);
    console.log(match)

    res.status(200).json({ message: 'sending your accesstoken' })
    
    
    // const data = await axios.post('https://accounts.zoho.com/oauth/v2/token?client_id=1000.7CAW02T2H0JPSC5ZRJHVLV9DPBX4ZT&grant_type=refresh_token&client_secret=51ca70b87951da92d8d632458db19e71d4c92ce321&refresh_token=1000.54ba6ad132159765fb73d78172dda143.35a4bd27181afcf571c789254405cf61')
    // console.log(data)

    const baseUrl = process.env.BASE_URL
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const refreshToken = process.env.REFRESH_TOKEN

    const params = {
        client_id: clientId,
        grant_type: 'refresh_token',
        client_secret: clientSecret,
        refresh_token: refreshToken
    }

    console.log(baseUrl)
    console.log(accessToken)

    const url = 'https://marketingautomation.zoho.com/api/v1/json/listsubscribe';
    const listkey = '3zb6c2ec6e5eb01250c4d8907fdaeb777cb51dfa03959765cb3b8b9737a8a4785e';
    const param = {
    resfmt: 'JSON',
    listkey,
    leadinfo: JSON.stringify({
        'First Name': 'mart',
        'Last Name': 'uggh',
        'Lead Email': 'mattuggh@escroid.com'
    }),
    };
    const config = {
    headers: {
        'Authorization': 'Zoho-oauthtoken ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    };

axios.post(url, param, config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
       
}



