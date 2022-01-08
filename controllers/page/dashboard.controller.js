const accountService = require('../../service/account.service');
const orderService = require('../../service/order.service');
const productService = require('../../service/productData.service');
const firstDayOfMonth = require('../../utils/firstDayOfMonth');

module.exports.getAccount = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 8;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;
    const accoutData = await accountService.getAllAccount();
    let accoutArray = accoutData.slice(begin, end);
    res.locals.activeCell = 'accounts';
    res.locals.maxPage = (accoutData.length % 8 === 0) ? Math.round(accoutData.length / 8) : Math.round(accoutData.length / 8) + 1;
    res.locals.currentPage = parseInt(page);
    res.locals.accountData = accoutArray;
    res.render('accountDashboard');
}

module.exports.get = async (req, res, next) => {
    res.locals.activeCell = 'dashboard';
    res.locals.title = 'Analytics';
    const firstDate = firstDayOfMonth();
    res.locals.newClient = await accountService.getMonthlyNewClient(firstDate);
    res.locals.newSale = await orderService.getMonthlySale(firstDate);
    res.locals.newProduct = await productService.getMonthlyNewProduct(firstDate); 
    res.render('dashboard');
}

module.exports.getStore = async (req, res, next) => {
    res.locals.activeCell = 'store';
    res.render('staffStore');
}

module.exports.getOrder = async (req, res, next) => {
    res.locals.activeCell = 'order';
    res.render('dashboard');
}

module.exports.getProfile = (req, res) => {
    res.render('staffProfile');
}