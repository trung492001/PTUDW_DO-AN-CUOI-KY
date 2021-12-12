const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');

router.use('/', authRoute);

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/laptop', (req, res) => {
  res.render('laptop');
})

router.get('/404', (req, res) => res.render('404'));

module.exports = router;