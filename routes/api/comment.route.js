const express = require('express');
const router = express.Router();

const validate = require('../../middleware/api/validate.middleware');

const commentController = require('../../controllers/comment.controller');

const commentValidation = require('../../validation/comment.validation');

router.get('/', validate(commentValidation.get), commentController.get)
router.post('/add', validate(commentValidation.add), commentController.add)
router.post('/reply', validate(commentValidation.reply), commentController.reply)

module.exports = router;
