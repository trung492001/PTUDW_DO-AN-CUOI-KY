const express = require('express');
const router = express.Router();

const commentRoute = require('./comment.route');

router.use('/comment', commentRoute);

module.exports = router;
