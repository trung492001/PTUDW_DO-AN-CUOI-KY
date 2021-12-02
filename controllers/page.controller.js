const dishModels = require('../models/dish.model');
const categoryModels = require('../models/category.model');
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
    const categoryData = await categoryModels.find();
    const dishData = await data.loadMenu(dishType);
    
    //Pagination
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 8;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;
    const dishArray = dishData.slice(begin, end);
    res.locals.dishs = dishArray;
    res.locals.category = categoryData;
    res.locals.currentPage = req.query.page;
    res.locals.maxPage = (dishData.length / 8 == 0) ? dishData.length / 8 + 1 : dishData.length / 8;
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

const dishPost = function(req, res) {
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

const dishUpdateAndDelete = async function(req, res) {
    if(req.file) {
        const dishData = await dishModels.findOne(
            {_id: req.params.id},
        );
        dishData.dishName = req.body.name
        dishData.price = req.body.price,
        dishData.ingredient = req.body.ingredient,
        dishData.description = req.body.description,
        dishData.image = req.file.path.split('\\').slice(1).join('/'),
        dishData.save();
    } else {
        const dishData = await dishModels.findOneAndDelete(
            {_id: req.params.id},
        );
        dishData.save();
    }
    res.redirect('/menu');
};

module.exports ={
    signInGet,
    registerGet,
    detailGet,
    aboutUsGet,
    menuGet,
    staffSignInGet,
    reservationGet,
    shoppingCartGet,
    dishPost,
    dishUpdateAndDelete
};