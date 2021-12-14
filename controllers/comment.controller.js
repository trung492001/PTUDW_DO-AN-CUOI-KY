const catchAsync = require("../utils/catchAsync");
const { BadRequest } = require("../utils/response");
const pagination = require("../utils/pagination");
const commentService = require("../service/comment.service");

module.exports.add = catchAsync(async (req, res) => {
  const { productId, anonymousUsername, content } = req.body;
  if (!req.user && !anonymousUsername) {
    throw new BadRequest("Thiếu tên người dùng!");
  }
  const newComment = await commentService.add(productId, req.user?._id, anonymousUsername, content);
  res.send(newComment);
})

module.exports.reply = catchAsync(async (req, res) => {
  const { parentId, anonymousUsername, content } = req.body;
  if (!req.user && !anonymousUsername) {
    throw new BadRequest("Thiếu tên người dùng!");
  }
  const reply = await commentService.reply(parentId, req.user?._id, anonymousUsername, content);
  res.send(reply);
})

module.exports.get = catchAsync(async (req, res) => {
  const { productId, page } = req.query;
  const pagi = pagination({ page, pageSize: 5 });
  const data = await commentService.get(productId, pagi);
  res.send(data);
})