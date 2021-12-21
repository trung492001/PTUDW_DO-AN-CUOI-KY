const express = require('express');
const router = express.Router();

const validate = require('../../middleware/api/validate.middleware');

const orderController = require('../../controllers/order.controller');

const orderValidation = require('../../validation/order.validation');

router.post('/', validate(orderValidation.add), orderController.add)

module.exports = router;
