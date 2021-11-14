var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-in', (req, res, next) => {
  res.render('signIn');
})
router.get('/register', (req, res, next) => {
  res.render('register');
})

module.exports = router;
