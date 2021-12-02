var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index.controller');
const pageController = require('../controllers/page.controller');
const clientValidate = require('../validate/logInValidation');
const clientcontroller = require('../controllers/logIn.controller');

//Upload Image
const multer  = require('multer');
const app = require('../app');
const upload = multer({ dest: './public/uploads/' });
/* GET home page. */
router.get('/', indexController.indexGet);

router.get('/sign-in', pageController.signInGet);

router.post('/sign-in', clientValidate.validateLoginClient);

router.get('/register', pageController.registerGet);

router.get('/menu', pageController.menuGet);

router.get('/detail', pageController.detailGet);

router.get('/AboutUs', pageController.aboutUsGet);

router.get('/sign-in-staff', pageController.staffSignInGet);

router.get('/reservation', pageController.reservationGet);

router.get('/ShoppingCart', pageController.shoppingCartGet);

router.post('/dish', upload.single('image'), pageController.dishPost);

router.post('/dish/:id', upload.single('image'), pageController.dishUpdateAndDelete);

module.exports = router;
