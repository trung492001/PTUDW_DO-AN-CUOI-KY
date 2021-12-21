const express = require('express');
const router = express.Router();

const commentRoute = require('./comment.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');

const userAuthApiMiddleware = require('../../middleware/api/user.auth.api.middleware');

router.use('/comment', commentRoute);
router.use('/product', productRoute);
router.use('/order', userAuthApiMiddleware, orderRoute);

module.exports = router;
