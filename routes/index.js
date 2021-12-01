var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index.controller');
const pageController = require('../controllers/page.controller');
const clientValidate = require('../validate/logInValidation');
const clientcontroller = require('../controllers/logIn.controller');
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

module.exports = router;
