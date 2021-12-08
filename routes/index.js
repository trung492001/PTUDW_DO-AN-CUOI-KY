var express = require('express');
var router = express.Router();
var passport = require('passport');

// Controllers
const pageController = require('../controllers/page.controller');
const staffController = require('../controllers/staff.controller');
const userController = require('../controllers/user.controller');
// Middleware
const staffAuthMiddleware = require('../middleware/staffAuthentication.middleware');
const authMiddleware = require('../middleware/authMiddleware.middleware');
const userAuthMiddleware = require('../middleware/userAuthentication.middleware');
const registerAuthentication = require('../middleware/registerMiddleware.middleware');
//Upload Image
const multer  = require('multer');
const app = require('../app');
const upload = multer({ dest: './public/uploads/' });
/* GET home page. */
router.get('/', pageController.indexGet);

router.get('/dashboard',authMiddleware.StaffAuthMiddleware, pageController.dashboardGet);

router.get('/dashboard/account/admin',authMiddleware.StaffAuthMiddleware, pageController.dashboardStaffAccount);

router.get('/dashboard/account/customer',authMiddleware.StaffAuthMiddleware, pageController.dashboardCustomerAccount);

router.get('/sign-in', pageController.signInGet);

router.post('/sign-in', userAuthMiddleware.userAuthentication, userController.userLogin);

router.get('/register', pageController.registerGet);

router.post('/register', registerAuthentication.registerAuthentication, userController.userLogin);

router.get('/menu', pageController.menuGet);

router.get('/detail', pageController.detailGet);

router.get('/AboutUs', pageController.aboutUsGet);

router.get('/sign-in-staff', pageController.staffSignInGet);

router.post('/sign-in-staff', staffAuthMiddleware.staffAuthentication, staffController.staffLogin);

router.get('/reservation', authMiddleware.AuthMiddleware, pageController.reservationGet);

router.get('/ShoppingCart', authMiddleware.AuthMiddleware, pageController.shoppingCartGet);

router.get('/log-out', pageController.logOut);

router.post('/dish', upload.single('image'), pageController.dishPost);

router.post('/dish/:id', upload.single('image'), pageController.dishUpdateAndDelete);

router.get('/profile', authMiddleware.AuthMiddleware, pageController.profilePageGet);

router.get('/dashboard/staff-menu', authMiddleware.StaffAuthMiddleware, pageController.staffMenuGet);

router.get('/dashboard/staff-profile', authMiddleware.StaffAuthMiddleware, pageController.staffProfileGet);

router.post('/add-staff', pageController.staffAddNewAccount);

module.exports = router;
