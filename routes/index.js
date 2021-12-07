var express = require('express');
var router = express.Router();
var passport = require('passport');

// Controllers
const indexController = require('../controllers/index.controller');
const pageController = require('../controllers/page.controller');
const staffController = require('../controllers/staff.controller');
const userController = require('../controllers/user.controller');
// Middleware
const staffAuthMiddleware = require('../middleware/staffAuthentication.middleware');
const authMiddeleware = require('../middleware/authMiddleware.middleware');
const userAuthMiddleware = require('../middleware/userAuthentication.middleware');
//Upload Image
const multer  = require('multer');
const app = require('../app');
const upload = multer({ dest: './public/uploads/' });
/* GET home page. */
router.get('/', indexController.indexGet);


router.get('/dashboard',authMiddeleware.StaffAuthMiddleware, pageController.dashboardGet);

router.get('/dashboard/account/admin',authMiddeleware.StaffAuthMiddleware, pageController.dashboardAdminAccount);

router.get('/dashboard/account/customer',authMiddeleware.StaffAuthMiddleware, pageController.dashboardCustomerAccount);

router.get('/sign-in', pageController.signInGet);

router.post('/sign-in', userAuthMiddleware.userAuthentication, userController.userLogin);

router.get('/register', pageController.registerGet);

router.get('/menu', pageController.menuGet);

router.get('/detail', pageController.detailGet);

router.get('/AboutUs', pageController.aboutUsGet);

router.get('/sign-in-staff', pageController.staffSignInGet);

router.post('/sign-in-staff', staffAuthMiddleware.staffAuthentication, staffController.staffLogin);

router.get('/reservation', pageController.reservationGet);

router.get('/ShoppingCart', authMiddeleware.AuthMiddleware, pageController.shoppingCartGet);

router.get('/log-out', pageController.logOut);

router.post('/dish', upload.single('image'), pageController.dishPost);

router.post('/dish/:id', upload.single('image'), pageController.dishUpdateAndDelete);

router.get('/profile', authMiddeleware.AuthMiddleware, pageController.profilePageGet);

module.exports = router;
