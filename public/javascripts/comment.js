const request = require('./utils/request');

function loadComment(page) {
  const productId = window.location.pathname.split('/').at(-1);
  request.get(`/api/comment?productId=${productId}&page=${page}`, (err, res) => {
    
  })
}