var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-in', (req, res, next) => {
  res.render('signIn');
})

router.get('/register', (req, res, next) => {
  res.render('register');
})

router.get('/menu', (req, res, next) => {
  res.render('menu');
})

router.get('/detail', (req, res, next) => {
  res.render('detail');
});

router.get('/AboutUs', (req, res, next) => {
  res.render('AboutUs');
});

module.exports = router;
