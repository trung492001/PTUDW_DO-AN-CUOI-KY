const indexGet = async function(req, res) {
    // Check User Cookie
    // If userCookie === true => load User Info
    // Else Load -> raw Index page
    res.render('index');
};

module.exports ={
  indexGet,
};