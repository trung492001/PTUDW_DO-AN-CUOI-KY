var express = require('express');
var router = express.Router();
const dishModels = require('../models/dish.model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/sign-in', (req, res, next) => {
  res.render('signIn');
})

router.get('/register', (req, res, next) => {
  res.render('register');
})

router.get('/menu', async (req, res, next) => {
  const pizzaData = await dishModels.find(
    {
      type: "pizza",
    },
  );
  const saladData = await dishModels.find(
    {
      type: "salad",
    },
  );
  const pastaData = await dishModels.find(
    {
      type: "pasta",
    },
  );
  res.locals.salads = saladData;
  res.locals.pasta = pastaData;
  res.locals.dishs = pizzaData;
  res.render('menu');
})

router.get('/detail', (req, res, next) => {
  res.render('detail');
});

router.get('/AboutUs', (req, res, next) => {
  res.render('AboutUs');
});

module.exports = router;
