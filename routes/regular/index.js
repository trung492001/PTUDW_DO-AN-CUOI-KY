const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const indexController = require('../../controllers/auth/index.controller');
const laptopController = require('../../controllers/page/laptop.controller');
const detailLaptopController = require('../../controllers/page/productDetail.controller');

router.use('/', authRoute);

router.get('/', indexController);

router.get('/laptop', laptopController);

router.get('/detailLaptop?', detailLaptopController);

router.get('/laptop/:id', (req, res) => res.render('detailLaptop'));

router.get('/404', (req, res) => res.render('404'));

router.get('/ShoppingCart', (req, res) => res.render('cart'));

module.exports = router;