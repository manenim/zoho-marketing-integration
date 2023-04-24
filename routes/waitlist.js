
const express = require('express');
// const addToWaitlist = require('../controllers/waitlist/addToWaitlist');

const router = express.Router();



// router.post('/add', addToWaitlist);
router.post('/add', (req, res) => {
    email = req.body.email
    res.send(`${email} added to waitlist!`)
});

module.exports = router;
