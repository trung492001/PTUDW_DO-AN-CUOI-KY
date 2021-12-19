const express = require('express');
const router = express.Router();

const validate = require('../../middleware/api/validate.middleware');
const productValidation = require('../../validation/product.validation')
const productController = require('../../controllers/product.controller');

router.post('/min', validate(productValidation.getMinInfoByIdArray), productController.getMinInfoForCart);

module.exports = router;
