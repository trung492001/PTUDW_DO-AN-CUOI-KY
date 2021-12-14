const express = require('express');
const router = express.Router();

const userDataMiddleware = require('../middleware/userData.middleware.js')

const regularRoute = require('./regular');
const apiRoute = require('./api');

/* GET home page. */

router.use('/api', apiRoute);

router.use('/', userDataMiddleware, regularRoute)


module.exports = router;