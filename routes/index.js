var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-in', (req, res, next) => {
  res.render('signIn');
})

module.exports = router;
