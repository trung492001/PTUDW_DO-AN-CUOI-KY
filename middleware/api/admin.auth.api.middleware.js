const catchAsync = require("../../utils/catchAsync");
const { Forbidden } = require("../../utils/response");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.user) {
    throw new Forbidden('Permission denied!');
  } else {
    return next();
  }
})