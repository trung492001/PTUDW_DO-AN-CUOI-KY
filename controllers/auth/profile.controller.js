const { render } = require('pug');
const accountService = require('../../service/account.service');
const changePasswordValidation = require('../../validation/account/changePassword.validation');
const orderService = require('../../service/order.service');
const productService = require('../../service/productData.service');

module.exports.postProfile = async (req, res, next) => {
    accountService.Update(req.user,req.body);
    if(req.user.role === 100) {
        res.redirect('/dashboard/staff-profile');
    } else {
        res.redirect('/profile');
    }
}
module.exports.get = async (req, res) => {
    let total = 0;
    let orderProcessing = [];
    let orderFinished = [];
    const orders = await orderService.getOrderOfCustomer(req.user._id);
    for (let i =0; i < orders.length; i++){
        
        let IdProduct = orders[i].cart[0].productId;
        let productName = await productService.getNameProduct(IdProduct);
        orders[i].FirstProductName = productName.name;
        
        let cart = orders[i].cart;
        for(let j = 0; j < cart.length; j++){
            total += cart[j].unitPrice * cart[j].quantity;
        }
        orders[i].total = total;
        const nlBEFormatter = new Intl.DateTimeFormat('nl-BE');
        orders[i].createdAt = nlBEFormatter.format(orders[i].createdAt);
        if(orders[i].status == -1 || orders[i].status == 2){
            orderFinished.push(orders[i]);
        }
        else orderProcessing.push(orders[i]);
    }
    res.locals.orderFinished = orderFinished;
    res.locals.orderProcessing = orderProcessing;
    res.render('profile');
}

module.exports.postPassword = async(req,res) =>{
    const { error, value } = changePasswordValidation.validate(req.body, {
        allowUnknown: true
    });
    if (error) {
        console.log("Error",error.message);
        res.render('profile', { error: error.message });
    }
    const result = await accountService.changePassword(req.user._id,req.body.oldPassword,req.body.newPassword)
    if (result === null) {
        res.render('profile', {error: 'Mật khẩu hiện tại không đúng'});
    }
    res.redirect('/profile');
}

module.exports.getDetailOrder = async(req,res) => {
    const order = await orderService.getOrder(req.params.id);
    
    const nlBEFormatter = new Intl.DateTimeFormat('nl-BE');
    order.date = nlBEFormatter.format(order.createdAt);
    let total = 0;

    let cart = await Promise.all(order.cart.map(async function(product){
        let cost = product.unitPrice * product.quantity;
        total += cost;
        let quantity = product.quantity;
        const detail = await productService.getOneProduct(product.productId);
        return {quantity,detail};
    }));
    order.cart = cart;
    console.log(cart);
    order.total = total;
    res.locals.order = order;
    res.render("detailOrder");
}