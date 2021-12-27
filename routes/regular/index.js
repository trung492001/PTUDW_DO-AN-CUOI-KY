const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/images/uploads' })

const authRoute = require('./auth.route');
const indexController = require('../../controllers/auth/index.controller');
const cartController = require('../../controllers/page/cart.controller');
const placeOrderController = require('../../controllers/page/placeOrder.controller');
const laptopController = require('../../controllers/page/laptop.controller');
const detailLaptopController = require('../../controllers/page/productDetail.controller');
const categoryController = require('../../controllers/page/category.controller');
const profileController = require('../../controllers/auth/profile.controller');
const dashboardController = require('../../controllers/page/dashboard.controller');
const resetPasswordController = require('../../controllers/auth/resetPassword.controller');
const forgotController = require('../../controllers/page/forgot.controller');
const banUserController = require('../../controllers/auth/banUser.controller');
const adminProductController = require('../../controllers/adminProduct.controller');

const banUserMiddleware = require('../../middleware/banUser.middleware');
const adminAuthMiddleware = require('../../middleware/admin.auth.middleware');
const userAuthMiddleware = require('../../middleware/user.auth.middleware');
router.use('/', authRoute);

router.get('/', banUserMiddleware, indexController.get);

router.post('/', indexController.post);

router.get('/laptop', banUserMiddleware, laptopController);

router.get('/detailLaptop?', banUserMiddleware, detailLaptopController);

router.get('/laptop/:id', banUserMiddleware, (req, res) => res.render('detailLaptop'));

router.get('/404', (req, res) => res.render('404'));

router.get('/cart', banUserMiddleware, cartController.get);

router.get('/place-order', banUserMiddleware, userAuthMiddleware, placeOrderController.get)

router.get('/place-order-success', banUserMiddleware, userAuthMiddleware, placeOrderController.success);

router.get('/profile', banUserMiddleware, userAuthMiddleware, profileController.get);

router.post('/profile/updateProfile', banUserMiddleware, userAuthMiddleware, profileController.postProfile);

router.post('/profile/changePassword', banUserMiddleware, userAuthMiddleware, profileController.postPassword);

router.get('/category?', banUserMiddleware, categoryController);

router.get('/dashboard', banUserMiddleware, adminAuthMiddleware, dashboardController.get);

router.get('/dashboard/accounts', banUserMiddleware, adminAuthMiddleware, dashboardController.getAccount);

router.get('/dashboard/store', banUserMiddleware, adminAuthMiddleware, dashboardController.getStore);

router.get('/dashboard/order', banUserMiddleware, adminAuthMiddleware, dashboardController.getOrder);

router.get('/dashboard/staff-profile', banUserMiddleware, adminAuthMiddleware, dashboardController.getProfile);

router.get('/staffSignIn', (req, res) => res.render('staffSignIn'));

router.get('/forgot', forgotController.get);

router.post('/forgot', forgotController.post);

router.post('/account/password-reset/:userId/:token', resetPasswordController.post);

router.get('/account/password-reset/:userId/:token', resetPasswordController.get);

router.get('/BanUser', banUserController.banUser);

router.get('/UnbanUser', banUserController.unbanUser);

router.post('/addNewProduct', upload.single('image'), adminProductController.addNewProduct);

router.post('/addNewCategory', upload.single('image'), adminProductController.addNewCategory);

module.exports = router;