var express = require('express');
var router = express.Router();

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
const multer = require('multer');
const app = require('../app');
const upload = multer({ dest: './public/uploads/' });
/* GET home page. */
router.get('/', indexController.indexGet);


router.get('/dashboard', async (req, res, next) => {
    res.render('dashboard', {
        title: "Dashboard",
        activeCell: ['dashboard'],
        breadcrumb: [
            {
                name: 'Dashboard'
            }
        ]
    });
});

router.get('/dashboard/account/admin', async (req, res, next) => {
    res.render('accountDashboard', {
        title: "Admin accounts",
        breadcrumb: [
            {
                link: '/dashboard',
                name: 'Dashboard'
            },
            {
                name: 'Account'
            },
            {
                name: 'Admin'
            }
        ],
        activeCell: ['account', 'admin']
    });
});

router.get('/dashboard/account/customer', async (req, res, next) => {
    res.render('accountDashboard', {
        currentQuery: req.query.query,
        currentPage: req.query.page ?? 1,
        pageCount: 40,
        title: "Customer accounts",
        breadcrumb: [
            {
                link: '/dashboard',
                name: 'Dashboard'
            },
            {
                name: 'Account'
            },
            {
                name: 'Admin'
            }
        ],
        activeCell: ['account', 'customer']
    });
});

router.get('/sign-in', pageController.signInGet);

router.post('/sign-in', userAuthMiddleware.userAuthentication, userController.userLogin);

router.get('/register', pageController.registerGet);

router.get('/menu', pageController.menuGet);

router.get('/detail', pageController.detailGet);

router.get('/AboutUs', pageController.aboutUsGet);

router.get('/sign-in-staff', pageController.staffSignInGet);

router.post('/sign-in-staff', staffAuthMiddleware.staffAuthentication, staffController.staffLogin);

router.get('/reservation', pageController.reservationGet);

router.get('/ShoppingCart', pageController.shoppingCartGet);

router.get('/log-out', pageController.logOut);

router.post('/dish', upload.single('image'), pageController.dishPost);

router.post('/dish/:id', upload.single('image'), pageController.dishUpdateAndDelete);

router.get('/profile', authMiddeleware.AuthMiddleware, pageController.profilePageGet);

module.exports = router;
