
const express = require('express');
const addToWaitlist = require('../controllers/waitlist');

const router = express.Router();



// router.post('/add', addToWaitlist);
router.post('/add', addToWaitlist);

module.exports = router;
