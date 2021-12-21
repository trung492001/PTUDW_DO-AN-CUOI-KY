function createProductCell({ quantity, name, price }) {
  const wrapper = document.createElement('div');
  wrapper.className = "flex justify-between px-0 md:px-4 py-4 space-x-1";

  const nameWrapper = document.createElement('div');
  nameWrapper.className = "font-bold leading-5";
  const quantityElement = document.createElement('span');
  quantityElement.className = "text-brand";
  quantityElement.innerText = `${quantity} x `;
  nameWrapper.appendChild(quantityElement);
  nameWrapper.innerHTML += name;

  const priceElement = document.createElement('div');
  priceElement.className = "font-bold leading-5";
  priceElement.innerText = `${price.toLocaleString()} ₫`;

  wrapper.appendChild(nameWrapper);
  wrapper.appendChild(priceElement);

  return wrapper;
}

function loadCartMinInformation() {
  const cart = JSON.parse(localStorage.getItem('cart') || "[]");
  if (cart.length === 0) {
    document.getElementById("cart-empty").classList.remove('hidden');
  } else {
    const payload = cart.map(e => e.productId);
    let total = 0;
    let productCount = 0;
    axios.post('/api/product/min', { productId: payload }).then(res => {
      const cartList = res.data.result.map(e => {
        const quantity = cart.find(cartElement => cartElement.productId === e._id).quantity
        total += e.price * quantity;
        productCount += quantity;
        return {
          ...e,
          quantity
        }
      });
      const placeOrderProductList = document.getElementById('product-list');
      cartList.forEach(e => {
        const productElement = createProductCell(e);
        placeOrderProductList.appendChild(productElement);
      });
      document.getElementById('product-count').innerText = `Đơn hàng ( ${productCount}sp )`;
      document.getElementById('provisional-price').innerText = `${total.toLocaleString()} ₫`;
      document.getElementById('total-price').innerText = `${total.toLocaleString()} ₫`;
      document.getElementById("cart-not-empty").classList.remove('hidden');
    }).catch(err => {
      console.log(err);
      Toast.alert("Có lỗi khi tải thông tin sản phẩm trong giỏ hàng!")
    })
  }
}

function validate(field) {
  if (!document.getElementById(field).validity.valid) {
    document.getElementById(`validate-${field}-message`).classList.remove('hidden');
    return true;
  }
  return false;
}

function placeOrder() {
  document.getElementById("validate-name-message").classList.add('hidden');
  document.getElementById("validate-phone-message").classList.add('hidden');
  document.getElementById("validate-address-message").classList.add('hidden');
  if (validate("name") || validate("phone") || validate("address")) {
    return Toast.warning("Vui lòng điền đầy đủ thông tin!");
  }

  const payload = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    cart: JSON.parse(localStorage.getItem('cart') || "[]")
  }

  axios.post('/api/order', payload).then(res => {
    Toast.success('Đặt hàng thành công!');
    setTimeout(() => window.location.href = "/place-order-success", 2000);
  }).catch(err => {
    Toast.alert("Có lỗi khi đặt hàng!");
  })
}

loadCartMinInformation();