function setQuantity(id, newQuantity) {
  const cart = JSON.parse(localStorage.getItem('cart') || "[]");
  cart[cart.findIndex(e => e.productId === id)].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getQuantity(id) {
  return parseInt(document.getElementById(`quantity-value-${id}`).value);
}

function handleAddQuantity(id) {
  const currentQuantity = getQuantity(id);
  setQuantity(id, currentQuantity + 1);
  document.getElementById(`quantity-value-${id}`).value = currentQuantity + 1;
  const currentTotal = parseInt(document.getElementById('total').value);
  const unitPrice = parseInt(document.getElementById(`price-${id}`).value);
  const newTotal = currentTotal + unitPrice;
  document.getElementById('total').value = newTotal;
  document.getElementById('provisional-price').innerText = `${newTotal.toLocaleString()} ₫`;
  document.getElementById('total-price').innerText = `${newTotal.toLocaleString()} ₫`;
}

function handleReduceQuantity(id) {
  const currentQuantity = getQuantity(id);
  if (currentQuantity > 1) {
    setQuantity(id, currentQuantity - 1);
    document.getElementById(`quantity-value-${id}`).value = currentQuantity - 1;
    const currentTotal = parseInt(document.getElementById('total').value);
    const unitPrice = parseInt(document.getElementById(`price-${id}`).value);
    const newTotal = currentTotal - unitPrice;
    document.getElementById('total').value = newTotal;
    document.getElementById('provisional-price').innerText = `${newTotal.toLocaleString()} ₫`;
    document.getElementById('total-price').innerText = `${newTotal.toLocaleString()} ₫`;
  }
}

function cartItem({ _id, name, thumbnail, price, quantity }) {
  const wrapper = document.createElement('div');
  wrapper.className = "px-0 md:px-4 py-4 border-b border-gray-100 flex";
  wrapper.id = `cart-product-${_id}`;

  const thumbnailWrapper = document.createElement('div');
  thumbnailWrapper.className = "mr-6 w-20 h-20 md:w-168px md:h-168px";
  const thumbnailLink = document.createElement('a');
  thumbnailLink.href = `/detailLaptop?productId=${_id}`;
  const thumbnailImg = new Image();
  thumbnailImg.src = '/images/' + thumbnail[0];
  thumbnailLink.appendChild(thumbnailImg);
  thumbnailWrapper.appendChild(thumbnailLink);

  const mainWrapper = document.createElement('div');
  mainWrapper.className = "flex-1 space-y-2";

  const nameWrapper = document.createElement('a');
  nameWrapper.href = `/detailLaptop?productId=${_id}`;
  const nameElement = document.createElement('p');
  nameElement.className = "font-default text-base md:text-xl font-semibold";
  nameElement.innerText = name;
  nameWrapper.appendChild(nameElement);

  const unitPriceElement = document.createElement('div');
  unitPriceElement.className = "font-primary text-base leading-5 md:hidden font-bold";
  unitPriceElement.innerText = `${price.toLocaleString()} ₫`;
  const priceHolderInput = document.createElement('input');
  priceHolderInput.id = `price-${_id}`;
  priceHolderInput.className = "hidden";
  priceHolderInput.value = price;
  unitPriceElement.appendChild(priceHolderInput)

  const quantityWrapper = document.createElement('div');
  const quantityInputMinus = document.createElement('input');
  quantityInputMinus.type = 'button';
  quantityInputMinus.className = "cursor-pointer rounded-none rounded-l text-center border bg-gray-100 border-gray-200 h-8 w-7 align-top";
  quantityInputMinus.value = "-";
  quantityInputMinus.onclick = () => handleReduceQuantity(_id);
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = "1";
  quantityInput.value = quantity;
  quantityInput.disabled = true;
  quantityInput.id = `quantity-value-${_id}`;

  quantityInput.className = "rounded-none border-t text-center border-b bg-white border-gray-200 h-8 w-8";
  const quantityInputAdd = document.createElement('input');
  quantityInputAdd.type = 'button';
  quantityInputAdd.className = "cursor-pointer rounded-none rounded-r text-center border bg-gray-100 border-gray-200 h-8 w-7 align-top";
  quantityInputAdd.value = "+";
  quantityInputAdd.onclick = () => handleAddQuantity(_id);
  quantityWrapper.appendChild(quantityInputMinus);
  quantityWrapper.appendChild(quantityInput);
  quantityWrapper.appendChild(quantityInputAdd);

  const deleteCartBtn = document.createElement('button');
  deleteCartBtn.className = "text-sm leading-5 text-right md:text-left cursor-pointer";
  deleteCartBtn.innerText = "Xóa";
  deleteCartBtn.onclick = () => removeProduct(_id);

  mainWrapper.appendChild(nameWrapper);
  mainWrapper.appendChild(unitPriceElement);
  mainWrapper.appendChild(quantityWrapper);
  mainWrapper.appendChild(deleteCartBtn);

  const mobileWrapper = document.createElement('div');
  mobileWrapper.className = "ml-auto hidden md:block font-bold text-base text-black pr-6";
  mobileWrapper.innerText = `${price.toLocaleString()} ₫`;

  wrapper.appendChild(thumbnailWrapper)
  wrapper.appendChild(mainWrapper);
  wrapper.appendChild(mobileWrapper);

  return wrapper;
}

function removeProduct(id) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    Toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
    const currentTotal = parseInt(document.getElementById('total').value);
    const unitPrice = parseInt(document.getElementById(`price-${id}`).value);
    const unitQuantity = getQuantity(id);
    const newTotal = currentTotal - (unitPrice * unitQuantity);
    document.getElementById('total').value = newTotal;
    document.getElementById('provisional-price').innerText = `${newTotal.toLocaleString()} ₫`;
    document.getElementById('total-price').innerText = `${newTotal.toLocaleString()} ₫`;
    const newCart = cart.filter(e => e.productId !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    document.getElementById(`cart-product-${id}`).remove();
  } catch (err) {
    console.log(err);
    Toast.alert("Có lỗi khi xóa sản phẩm khỏi giỏ hàng!")
  }
}

function loadCartInformation() {
  const cart = JSON.parse(localStorage.getItem('cart') || "[]");
  if (cart.length === 0) {
    document.getElementById("cart-empty").classList.remove('hidden');
  } else {
    document.getElementById("cart-not-empty").classList.remove('hidden');
    const payload = cart.map(e => e.productId);
    let total = 0;
    axios.post('/api/product/min', { productId: payload }).then(res => {
      const cartList = res.data.result.map(e => {
        const quantity = cart.find(cartElement => cartElement.productId === e._id).quantity
        total += e.price * quantity;
        return {
          ...e,
          quantity
        }
      });
      const wrapper = document.getElementById('list-cart');
      wrapper.innerHTML = '';
      cartList.forEach(e => {
        const cartElement = cartItem(e);
        wrapper.appendChild(cartElement);
      });
      document.getElementById('total').value = total;
      document.getElementById('provisional-price').innerText = `${total.toLocaleString()} ₫`;
      document.getElementById('total-price').innerText = `${total.toLocaleString()} ₫`;
    }).catch(err => {
      console.log(err);
      Toast.alert("Có lỗi khi tải thông tin sản phẩm trong giỏ hàng!")
    })
  }
}

loadCartInformation();