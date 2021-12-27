const accountService = require('../../service/account.service'); 
const categoryService = require('../../service/category.service');
const productService = require('../../service/productData.service');

module.exports.getAccount = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 8;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;
    const accountData = await accountService.getAllAccount();
    for( var i = 0; i < accountData.length; i++){                         
        if (accountData[i]._id.valueOf() === req.user._id.valueOf()) {
            accountData.splice(i, 1); 
            i--; 
        }
    }
    let accountArray = accountData.slice(begin, end);
    res.locals.activeCell = 'accounts';
    if(accountData.length <= 8) {
        res.locals.maxPage = 1;
    } else {
        res.locals.maxPage = (accountData.length % 8 === 0) ? Math.round(accountData.length / 8) : Math.round(accountData.length / 8) + 1;
    }
    res.locals.currentPage = parseInt(page);
    res.locals.accountData =accountArray;
    res.render('accountDashboard');
}

module.exports.get = async (req, res, next) => {
    res.locals.activeCell = 'dashboard';
    res.render('dashboard');
}

module.exports.getStore = async (req, res, next) => {
    const category = await categoryService.getAllCategory();
    const brandId = req.query.brandId ? req.query.brandId : 0;
    const productData = await productService.getProductByBrand(brandId);

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 20;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;
    const productArray = productData.slice(begin, end);
    if(productData.length >= 20) {
        res.locals.maxPage = (productData.length % 20 === 0) ? Math.round(productData.length / 20) : Math.round(productData.length / 20) + 1;
    } else {
        res.locals.maxPage = 1;
    }

    res.locals.category = category;
    res.locals.currentCategory = brandId;
    res.locals.currentPage = parseInt(page);
    res.locals.productData = productArray;
    res.locals.activeCell = 'store';
    res.render('storeDashboard');
}

module.exports.getOrder = async (req, res, next) => {
    res.locals.activeCell = 'order';
    res.render('dashboard');
}

module.exports.getProfile = (req, res) => {
    res.render('staffProfile');
}