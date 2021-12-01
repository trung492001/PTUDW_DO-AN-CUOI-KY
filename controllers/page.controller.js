const dishModels = require('../models/dish.model');
const data = require('../service/loadData.service');
const signInGet = async function(req, res) {
    res.render('signIn');
};

const registerGet = async function(req, res) {
    res.render('register');
};

const detailGet = async function(req, res) {
    let productId = req.query.productId;
    const productData = await data.loadProductInfo(productId);
    res.locals.product = productData;
    res.render('detail');
};

const aboutUsGet = async function(req, res) {
    res.render('AboutUs');
};

const menuGet = async function(req, res) {
    let dishType;
    if (req.query.category) {
        dishType = req.query.category;
    } else {
        dishType = "61a54429e07ebfd5e449becb";
    }
    const dishData = await data.loadMenu(dishType);
    res.locals.dishs = dishData;
    res.render('menu');
};

const staffSignInGet = async function(req, res) {
    res.render('staffSignIn');
};

const reservationGet = async function(req, res) {
    res.render('reservation');
};

const shoppingCartGet = async function(req, res) {
    res.render('cart');
};

module.exports ={
    signInGet,
    registerGet,
    detailGet,
    aboutUsGet,
    menuGet,
    staffSignInGet,
    reservationGet,
    shoppingCartGet
};