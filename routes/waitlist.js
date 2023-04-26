const express = require('express');
const waitlistFunctions = require('../controllers/waitlist');
const router = express.Router();

const { addToWaitlist, tokenMiddleware } = waitlistFunctions;



router.post('/add', tokenMiddleware, addToWaitlist );

module.exports = router;
