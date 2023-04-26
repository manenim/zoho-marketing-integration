let accessToken = null
const refreshToken = process.env.REFRESH_TOKEN
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const zohoUrl = process.env.ZOHO_AUTH_URL

const refreshAccessToken = async () => {
   const data = await axios.post(`${zohoUrl}?client_id=${clientId}&grant_type=refresh_token&client_secret=${clientSecret}&refresh_token=${refreshToken}`)
    accessToken = data.data.access_token
    expirationTime =  Date.now() + (data.data.expires_in * 1000);
}


module.exports = {refreshAccessToken}