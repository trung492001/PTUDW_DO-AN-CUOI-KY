function createComment({ _id, user, anonymousUser, content, updatedAt }) {
  const comment = document.createElement('div');
  comment.className = "mt-5 relative";
  comment.id = `comment-item-${_id}`;

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = "w-8 h-8 sm:w-12 sm:h-12 mr-4 float-left overflow-hidden";
  const avatar = new Image();
  avatar.src = user?.avatar || anonymousUser.avatar;
  avatar.className = "rounded-full bg-white";
  avatarWrapper.appendChild(avatar);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList = "pb-4 border-b border-gray-200 mb-4 overflow-hidden";
  const usernameElement = document.createElement('h3');
  usernameElement.className = "font-semibold text-base leading-6";
  usernameElement.innerText = user?.name || anonymousUser.name;
  const contentElement = document.createElement('p');
  contentElement.className = "text-sm leading-5";
  contentElement.innerText = content;
  const timestampElement = document.createElement('span');
  timestampElement.className = "text-xs";
  timestampElement.innerText = updatedAt;
  contentWrapper.appendChild(usernameElement);
  contentWrapper.appendChild(contentElement);
  contentWrapper.appendChild(timestampElement);

  comment.appendChild(avatarWrapper);
  comment.appendChild(contentWrapper);

  return comment;
}

function loadComment(page = 1) {
  const productId = document.getElementById('product-id').value;
  console.log(productId);
  axios.get(`/api/comment?productId=${productId}&page=${page}`)
    .then(res => {
      const commentList = document.getElementById('comment-list');
      commentList.innerHTML = '';
      res.data.result.forEach(comment => {
        const parentComment = createComment(comment);
        const replySection = document.createElement('div');
        replySection.className = "pl-12 sm:pl-22";
        comment.reply.forEach(reply => {
          const replyComment = createComment(reply);
          replySection.appendChild(replyComment);
        });
        parentComment.appendChild(replySection);
        commentList.appendChild(parentComment);
      })
    })
    .catch(err => {
      console.log(err);
    })
}

function postComment() {
  const productId = document.getElementById('product-id').value;
  const content = document.getElementById('comment-input-content').value;
  const loggedIn = parseInt(document.getElementById('logged-in').value);
  const data = { productId, content };
  if (!loggedIn) {
    const anonymousUsername = document.getElementById('comment-input-username').value;
    if (!anonymousUsername) {
      return Toast.alert("Bạn cần để lại tên cho bình luận!");
    } else {
      data.anonymousUsername = anonymousUsername;
    }
  }
  if (!content) {
    return Toast.alert("Nội dung bình luận không thể trống!");
  }
  axios.post('/api/comment/add', data)
    .then(res => {
      const newComment = createComment(res.data);
      document.getElementById('comment-list').prepend(newComment);
    })
    .catch(err => {
      console.log(err);
    })
}

loadComment();