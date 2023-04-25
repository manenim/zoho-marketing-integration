import axios from 'axios'
import bcrypt from 'bcrypt'
import validator from 'validator'

const addToWaitlist = async (req, res) => {
    let { email } = req.body
    let hashedEmail = req.headers['email-hash']

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }
    const match = await bcrypt.compare(email, hashedEmail);
    console.log(match)

    res.send('Success')
}
 
module.exports = addToWaitlist