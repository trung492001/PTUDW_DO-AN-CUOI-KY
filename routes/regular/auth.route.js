const express = require('express');
const router = express.Router();

const loginController = require('../../controllers/auth/login.controller');
const registerController = require('../../controllers/auth/register.controller');
const logoutController = require('../../controllers/auth/logout.controller');

router
  .route('/login')
  .get(loginController.get)
  .post(loginController.post);

router.route('/register')
  .get(registerController.get)
  .post(registerController.post);

router.get('/logout', logoutController);

router.get('/account/active/:activeToken', registerController.active);

module.exports = router;