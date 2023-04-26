import bcrypt from 'bcrypt'
import validator from 'validator'

const listKey = process.env.LIST_KEY
const accessToken = process.env.ACCESS_TOKEN
const refreshToken = process.env.REFRESH_TOKEN
const addToWaitlist = async (req, res) => {
    let { email } = req.body
    // let hashedEmail = req.headers['email-hash']

    // const match = await bcrypt.compare(email, hashedEmail);

    res.json({email})

    // if (!validator.isEmail(email)) {
    //     return res.status(400).send('Invalid email address');
    // }
    // const match = await bcrypt.compare(email, hashedEmail);
    // console.log(match)

    // res.send('Success')
}
 
module.exports = addToWaitlist