var express = require('express');
var router = express.Router();
const catchAsync = require('../utils/catchAsync')
const authRoute = require('./auth.route');

//Upload Image
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
/* GET home page. */

router.use('/', authRoute);

router.get('/404', (req, res) => res.render('404'));

module.exports = router;
