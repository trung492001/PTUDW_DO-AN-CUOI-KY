const staffModels = require('../models/staff.model');

const indexGet = async function(req, res) {
    // Check User Cookie
    // If userCookie === true => load User Info
    // Else Load -> raw Index page
    if (req.signedCookies.staffId !== false) {
      const userData = await staffModels.findOne(
          {_id: req.signedCookies.staffId},
      );
      res.locals.user = userData;
      res.render('index');
    } else {
      res.render('index');
    }
};

module.exports ={
  indexGet,
};