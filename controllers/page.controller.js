const dishModels = require('../models/dish.model');
const categoryModels = require('../models/category.model');
const data = require('../service/loadData.service');
const pagination = require('../utils/pagination');
const customerModel = require("../models/customer.model");
const cartModel = require("../models/cart.model");

const signInGet = async function (req, res) {
    res.render('signIn');
};

const registerGet = async function (req, res) {
    res.render('register');
};

const detailGet = async function (req, res) {
    let productId = req.query.productId;
    const productData = await data.loadProductInfo(productId);
    res.locals.product = productData;
    res.render('detail');
};

const aboutUsGet = async function (req, res) {
    res.render('AboutUs');
};

const menuGet = async function (req, res) {
    let dishType;
    const pagi = pagination({ page: req.query.page });

    if (req.query.category) {
        dishType = req.query.category;
    } else {
        dishType = "61a54429e07ebfd5e449becb";
    }

    const categoryData = await categoryModels.find();
    const menuData = await data.loadMenu(dishType, pagi);

    res.locals.dishes = menuData.dishData;
    res.locals.category = categoryData;
    res.locals.currentCategory = dishType;
    res.locals.currentPage = req.query.page ? req.query.page : 1;
    res.locals.pageCount = menuData.pageCount;
    res.render('menu');
};

const staffSignInGet = async function (req, res) {
    res.render('staffSignIn');
};

const reservationGet = async function (req, res) {
    res.render('reservation');
};

const shoppingCartGet = async function (req, res) {
    res.render('cart');
};

const dishPost = function (req, res) {
    const newDish = new dishModels({
        dishName: req.body.name,
        price: req.body.price,
        ingredient: req.body.ingredient,
        description: req.body.description,
        image: req.file.path.split('\\').slice(1).join('/'),
        type: req.body.type
    });
    newDish.save();
    res.redirect('menu');
};

const dishUpdateAndDelete = async function (req, res) {
    if (req.file) {
        const dishData = await dishModels.findOne(
            { _id: req.params.id },
        );
        dishData.dishName = req.body.name
        dishData.price = req.body.price,
            dishData.ingredient = req.body.ingredient,
            dishData.description = req.body.description,
            dishData.image = req.file.path.split('\\').slice(1).join('/'),
            dishData.save();
    } else {
        const dishData = await dishModels.findOneAndDelete(
            { _id: req.params.id },
        );
        dishData.save();
    }
    res.redirect('/menu');
};

const logOut = function(req, res) {
    // Clear Staff Cookie and Log Out
    req.logout();
    res.clearCookie('staffId');
    res.redirect('/');
}

const profilePageGet = async function (req, res) {
    res.render('profilePage');
};

module.exports = {
    signInGet,
    registerGet,
    detailGet,
    aboutUsGet,
    menuGet,
    staffSignInGet,
    reservationGet,
    shoppingCartGet,
    dishPost,
    dishUpdateAndDelete,
    logOut,
    profilePageGet
};