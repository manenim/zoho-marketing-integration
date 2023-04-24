
const express = require('express');
const addToWaitlist = require('../controllers/waitlist/addToWaitlist');

const router = express.Router();



router.post('/add', addToWaitlist);

module.exports = router;
