const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const indexController = require('../../controllers/auth/index.controller');

router.use('/', authRoute);

router.get('/', indexController);

router.get('/laptop', (req, res) => {
  res.render('laptop');
})

router.get('/404', (req, res) => res.render('404'));

module.exports = router;