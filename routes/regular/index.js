const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const indexController = require('../../controllers/auth/index.controller');
const laptopController = require('../../controllers/page/laptop.controller');
const detailLaptopController = require('../../controllers/page/productDetail.controller');
const categoryController = require('../../controllers/page/category.controller');
const profileController = require('../../controllers/auth/profile.controller');
const dashboardController = require('../../controllers/page/dashboard.controller');
const resetPasswordController = require('../../controllers/auth/resetPassword.controller');
const forgotController = require('../../controllers/page/forgot.controller');

router.use('/', authRoute);

router.get('/', indexController);

router.get('/laptop', laptopController);

router.get('/detailLaptop?', detailLaptopController);

router.get('/laptop/:id', (req, res) => res.render('detailLaptop'));

router.get('/404', (req, res) => res.render('404'));

router.get('/ShoppingCart', (req, res) => res.render('cart'));

router.get('/profile', profileController.get);

router.post('/profile/updateProfile', profileController.postProfile);

router.post('/profile/changePassword', profileController.postPassword);

router.get('/category?', categoryController);

router.get('/dashboard', async (req, res, next) => {
    res.locals.activeCell = 'dashboard';
    res.render('dashboard');
});

router.get('/dashboard/accounts', dashboardController.get);

router.get('/dashboard/store', async (req, res, next) => {
    res.locals.activeCell = 'store';
    res.render('staffStore');
});

router.get('/dashboard/order', async (req, res, next) => {
    res.locals.activeCell = 'order';
    res.render('dashboard');
});

router.get('/dashboard/staff-profile', (req, res) => res.render('staffProfile'));

router.get('/staffSignIn', (req, res) => res.render('staffSignIn'));

router.get('/forgot', forgotController.get);

router.post('/forgot', forgotController.post);

router.post('/account/password-reset/:userId/:token', resetPasswordController.post);

router.get('/account/password-reset/:userId/:token', resetPasswordController.get);

module.exports = router;