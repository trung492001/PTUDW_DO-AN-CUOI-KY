const accountService = require('../../service/account.service'); 
const categoryService = require('../../service/category.service');
const productService = require('../../service/productData.service');
const orderService = require('../../service/order.service');

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
    const orders = await orderService.getOrderData();
    for (let i = 0; i < orders.length; i++){
        let cart = orders[i].cart;
        let total = 0;
        for (let j = 0; j < cart.length; j++){
            let product = await productService.getOneProduct(cart[j].productId);
            cart[j].productName = product.name;
            total += cart[j].unitPrice * cart[j].quantity;
        }
        orders[i].total = total;
        let user = await accountService.getUserById(orders[i].user);
        orders[i].username = user.name;
    }
    res.locals.activeCell = 'order';
    res.locals.order = orders;
    res.render('orderDashboard');
}

module.exports.getProfile = (req, res) => {
    res.render('staffProfile');
}

module.exports.cancelOrder = (req,res) => {
    orderService.updateStatus(req.query.orderId,-1);
    res.redirect('/dashboard/order');
}

module.exports.inTransmitOrder = (req,res) => {
    orderService.updateStatus(req.query.orderId,1);
    res.redirect('/dashboard/order');
}
module.exports.deliveredOrder = (req,res) => {
    orderService.updateStatus(req.query.orderId,2);
    res.redirect('/dashboard/order');
}

module.exports.processOrder = (req,res) => {
    orderService.updateStatus(req.query.orderId,0);
    res.redirect('/dashboard/order');
}