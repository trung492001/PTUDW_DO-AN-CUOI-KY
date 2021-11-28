const dishModels = require('../models/dish.model');

const signInGet = async function(req, res) {
    res.render('signIn');
};

const registerGet = async function(req, res) {
    res.render('register');
};

const detailGet = async function(req, res) {
    res.render('detail');
};

const aboutUsGet = async function(req, res) {
    res.render('AboutUs');
};

const menuGet = async function(req, res) {
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
};

const staffSignInGet = async function(req, res) {
    res.render('staffSignIn');
};

module.exports ={
    signInGet,
    registerGet,
    detailGet,
    aboutUsGet,
    menuGet,
    staffSignInGet
};