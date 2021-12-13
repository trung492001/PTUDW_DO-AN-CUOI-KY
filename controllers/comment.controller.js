const catchAsync = require("../utils/catchAsync");
const pagination = require("../utils/pagination");
const commentService = require("../service/comment.service");

module.exports.add = catchAsync(async (req, res) => {
  const { productId, anonymousUsername, content } = req.body;
  await commentService.add(productId, req.user?._id, anonymousUsername, content);
  res.send("Success!");
})

module.exports.reply = catchAsync(async (req, res) => {
  const { parentId, anonymousUsername, content } = req.body;
  await commentService.reply(parentId, req.user?._id, anonymousUsername, content);
  res.send("Success!");
})

module.exports.get = catchAsync(async (req, res) => {
  const { productId, page } = req.query;
  const pagi = pagination({ page, pageSize: 5 });
  const data = await commentService.get(productId, pagi);
  res.send(data);
})