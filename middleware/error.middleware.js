require('dotenv');
const { DefaultError, STATUS_CODE } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    if (err instanceof DefaultError) {
      return res.status(err.getCode()).json({
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      })
    };
    console.error(err.stack);
    res.render('error');
};

module.exports = errorHandler
