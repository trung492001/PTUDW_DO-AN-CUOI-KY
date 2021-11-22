var express = require('express');
var router = express.Router();
const dishModels = require('../models/dish.model');
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

router.get('/menu', async (req, res, next) => {
  const menuData = await dishModels.find(
    {
      type: "pizza",
    },
  );
  res.locals.dishs = menuData;
  res.render('menu');
})

router.get('/detail', (req, res, next) => {
  res.render('detail');
});

router.get('/AboutUs', (req, res, next) => {
  res.render('AboutUs');
});

module.exports = router;
