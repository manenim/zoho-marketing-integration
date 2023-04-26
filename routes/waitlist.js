const express = require('express');
const {addToWaitlist} = require('../controllers/waitlist');
const { checkTokenExpiry } = require('../middlewares');
const router = express.Router();




router.post('/add', checkTokenExpiry, addToWaitlist );

module.exports = router;
