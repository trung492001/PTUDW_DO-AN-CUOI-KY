const express = require('express');
const router = express.Router();

const commentRoute = require('./comment.route');
const productRoute = require('./product.route');

router.use('/comment', commentRoute);
router.use('/product', productRoute);

module.exports = router;
