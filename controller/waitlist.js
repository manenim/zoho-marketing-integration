

const addToWaitlist = async (req, res) => {
    email = req.body.email
    res.send(`${email} added to waitlist!`)
 }