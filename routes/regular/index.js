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
const banUserController = require('../../controllers/auth/banUser.controller');

const adminAuthMiddleware = require('../../middleware/admin.auth.middleware');
const userAuthMiddleware = require('../../middleware/user.auth.middleware');
router.use('/', authRoute);

router.get('/', indexController.get);

router.post('/', indexController.post);

router.get('/laptop', laptopController);

router.get('/detailLaptop?', detailLaptopController);

router.get('/laptop/:id', (req, res) => res.render('detailLaptop'));

router.get('/404', (req, res) => res.render('404'));

router.get('/cart', (req, res) => {
    res.locals.breadcrumb = [{
        name: 'Home',
        link: '/'
    }, {
        name: 'Giỏ hàng',
        link: '/cart'
    }]
    res.render('cart');
});

router.get('/profile', userAuthMiddleware, profileController.get);

router.post('/profile/updateProfile', profileController.postProfile);

router.post('/profile/changePassword', profileController.postPassword);

router.get('/category?', categoryController);

router.get('/dashboard', adminAuthMiddleware, dashboardController.get);

router.get('/dashboard/accounts', adminAuthMiddleware, dashboardController.getAccount);

router.get('/dashboard/store', adminAuthMiddleware, dashboardController.getStore);

router.get('/dashboard/order', adminAuthMiddleware, dashboardController.getOrder);

router.get('/dashboard/staff-profile', adminAuthMiddleware, dashboardController.getProfile);

router.get('/staffSignIn', (req, res) => res.render('staffSignIn'));

router.get('/forgot', forgotController.get);

router.post('/forgot', forgotController.post);

router.post('/account/password-reset/:userId/:token', resetPasswordController.post);

router.get('/account/password-reset/:userId/:token', resetPasswordController.get);

router.get('/BanUser', banUserController.banUser);

module.exports = router;