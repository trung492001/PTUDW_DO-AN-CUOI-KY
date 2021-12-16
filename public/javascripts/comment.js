function replyBox(to) {
  console.log(to)
  const loggedIn = parseInt(document.getElementById('logged-in').value);

  const box = document.createElement('div');
  box.className = "reply-box mt-2.5 mb-7";
  const inputArea = document.createElement('textarea');
  inputArea.placeholder = "Xin hãy để lại bình luận";
  inputArea.className = "w-full h-20 p-4 outline-none bg-gray-100 resize-none rounded border border-gray-50 hover:border-blue-300 focus:border-blue-300 overflow-y-auto";
  inputArea.id = `reply-content-to-${to}`;

  const replyBtn = document.createElement('button');
  replyBtn.className = "px-4 py-1.5 rounded-full outline-none bg-brand font-bold text-white text-center float-right";
  replyBtn.innerText = "Gửi";
  replyBtn.onclick = () => replyComment(to);

  if (!loggedIn) {
    const inputName = document.createElement('input');
    inputName.placeholder = "Xin hãy để lại tên";
    inputName.id = `reply-name-to-${to}`;
    inputName.className = "mb-3 w-full p-4 outline-none bg-gray-100 rounded border border-gray-50 hover:border-blue-300 focus:border-blue-300";
    box.appendChild(inputName);
  }

  box.appendChild(inputArea);
  box.appendChild(replyBtn);

  return box;
}

function showReplyBox(thisComment, parentId) {
  [...document.getElementsByClassName("reply-box")].map(n => n && n.remove());
  const replyBoxElement = replyBox(parentId);
  document.getElementById(`comment-content-wrapper-${thisComment}`).appendChild(replyBoxElement);
}

function createComment({ _id, user, anonymousUser, content, updatedAt }, parentId) {
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
  contentWrapper.id = `comment-content-wrapper-${_id}`;
  contentWrapper.classList = "pb-4 border-b border-gray-200 mb-4 overflow-hidden";
  const usernameElement = document.createElement('h3');
  usernameElement.className = "font-semibold text-base leading-6";
  usernameElement.innerText = user?.name || anonymousUser.name;
  const contentElement = document.createElement('p');
  contentElement.className = "text-sm leading-5";
  contentElement.innerText = content;
  const replyBtn = document.createElement('button');
  replyBtn.innerText = "Trả lời";
  replyBtn.className = "text-brand font-semibold text-sm mr-2";
  replyBtn.onclick = () => showReplyBox(_id, parentId);
  const timestampElement = document.createElement('span');
  timestampElement.className = "text-xs";
  timestampElement.innerText = updatedAt;
  contentWrapper.appendChild(usernameElement);
  contentWrapper.appendChild(contentElement);
  contentWrapper.appendChild(replyBtn);
  contentWrapper.appendChild(timestampElement);

  comment.appendChild(avatarWrapper);
  comment.appendChild(contentWrapper);

  return comment;
}

function createPaginationBtn(cursor, innerHTML) {
  const li = document.createElement('li');
  li.className = `border py-1 text-center ${cursor}`;
  li.style = "min-width: 36px;";
  li.innerHTML = innerHTML;
  return li;
}

function createPagination(pageCount) {
  const currentPage = parseInt(document.getElementById('commentPage').value);
  const wrapper = document.createElement('nav');
  wrapper.className = "mt-6 mb-12";
  wrapper.id = "pagination";

  const ul = document.createElement('ul');
  ul.className = "flex justify-center gap-x-1";

  if (currentPage > 1) {
    const li = createPaginationBtn("cursor-pointer", '<i class="fas fa-chevron-left"></i>');
    li.onclick = () => loadComment(currentPage - 1);
    ul.appendChild(li);
  }

  if (pageCount < 8) {
    for (let i = 1; i <= pageCount; ++i) {
      if (i == currentPage) {
        const li = createPaginationBtn('bg-gray-100 cursor-not-allowed', `<span class="underline">${i}</span>`);
        ul.appendChild(li);
      } else {
        const li = createPaginationBtn('cursor-pointer', i);
        li.onclick = () => loadComment(i);
        ul.appendChild(li);
      }
    }
  } else {
    if (currentPage > 4) {
      const li = createPaginationBtn('cursor-pointer', 1);
      li.onclick = () => loadComment(1);
      const dot = document.createElement('li');
      dot.className = "text-center py-1 cursor-default";
      dot.style = "min-width: 36px;";
      dot.innerHTML = '<span class="mt-auto align-baseline text-gray-500">•••</span>';
      ul.appendChild(li);
      ul.appendChild(dot);
    }

    if (currentPage <= 4) {
      for (let i = 1; i <= (currentPage == 4 ? 6 : 5); ++i) {
        if (i == currentPage) {
          const li = createPaginationBtn('bg-gray-100 cursor-not-allowed', `<span class="underline">${i}</span>`);
          ul.appendChild(li);
        } else {
          const li = createPaginationBtn('cursor-pointer', i);
          li.onclick = () => loadComment(i);
          ul.appendChild(li);
        }
      }
    } else if (pageCount - currentPage < 4) {
      for (let i = (pageCount - currentPage == 3 ? currentPage - 2 : pageCount - 4); i <= pageCount; ++i) {
        if (i == currentPage) {
          const li = createPaginationBtn('bg-gray-100 cursor-not-allowed', `<span class="underline">${i}</span>`);
          ul.appendChild(li);
        } else {
          const li = createPaginationBtn('cursor-pointer', i);
          li.onclick = () => loadComment(i);
          ul.appendChild(li);
        }
      }
    }

    if (pageCount - currentPage >= 4) {
      const li = createPaginationBtn('cursor-pointer', pageCount);
      li.onclick = () => loadComment(pageCount);
      const dot = document.createElement('li');
      dot.className = "text-center py-1 cursor-default";
      dot.style = "min-width: 36px;";
      dot.innerHTML = '<span class="mt-auto align-baseline text-gray-500">•••</span>';
      ul.appendChild(dot);
      ul.appendChild(li);
    }
  }

  if (currentPage < pageCount) {
    const li = createPaginationBtn("cursor-pointer", '<i class="fas fa-chevron-right"></i>');
    li.onclick = () => loadComment(currentPage + 1);
    ul.appendChild(li);
  }

  wrapper.appendChild(ul);
  return wrapper;
}

function loadComment(page = 1) {
  const productId = document.getElementById('product-id').value;
  axios.get(`/api/comment?productId=${productId}&page=${page}`)
    .then(res => {
      const commentList = document.getElementById('comment-list');
      commentList.innerHTML = '';
      res.data.result.forEach(comment => {
        const parentComment = createComment(comment, comment._id);
        const replySection = document.createElement('div');
        replySection.className = "pl-12 sm:pl-22";
        replySection.id = `reply-list-${comment._id}`;
        comment.reply.forEach(reply => {
          const replyComment = createComment(reply, comment._id);
          replySection.appendChild(replyComment);
        });
        parentComment.appendChild(replySection);
        commentList.appendChild(parentComment);
      })
      commentList.appendChild(createPagination(res.data.pageCount));
      document.getElementById('pageCount').value = res.data.pageCount;
      document.getElementById('commentPage').value = page;
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
      document.getElementById('comment-input-content').value = "";
      if (!loggedIn) {
        document.getElementById('comment-input-username').value = "";
      }
      Toast.success("Bình luận thành công")
    })
    .catch(err => {
      console.log(err);
    })
}

function replyComment(to) {
  const loggedIn = parseInt(document.getElementById('logged-in').value);
  const content = document.getElementById(`reply-content-to-${to}`).value;
  const data = { parentId: to, content };
  if (!loggedIn) {
    const anonymousUsername = document.getElementById(`reply-name-to-${to}`).value;
    if (!anonymousUsername) {
      return Toast.alert("Bạn cần để lại tên cho trả lời bình luận!");
    } else {
      data.anonymousUsername = anonymousUsername;
    }
  }
  if (!content) {
    return Toast.alert("Nội dung bình luận không thể trống!");
  }
  axios.post('/api/comment/reply', data)
    .then(res => {
      const newComment = createComment(res.data);
      document.getElementById(`reply-list-${to}`).append(newComment);
      [...document.getElementsByClassName("reply-box")].map(n => n && n.remove());
      Toast.success("Trả lời bình luận thành công")
    })
    .catch(err => {
      console.log(err);
    })
}

loadComment();