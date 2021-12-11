const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');

router.use('/', authRoute);

router.get('/404', (req, res) => res.render('404'));

module.exports = router;