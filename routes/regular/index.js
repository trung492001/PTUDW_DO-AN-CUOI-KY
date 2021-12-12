const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const indexController = require('../../controllers/auth/index.controller');
const laptopController = require('../../controllers/auth/laptop.controller');

router.use('/', authRoute);

router.get('/', indexController);

router.get('/laptop', laptopController);

router.get('/404', (req, res) => res.render('404'));

module.exports = router;