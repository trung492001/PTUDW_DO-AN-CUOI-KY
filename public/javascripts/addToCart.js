function addProduct(id) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");

    if (!cart.some(e => e.productId === id)) {
      cart.push({ productId: id, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cart));
      Toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    } else {
      Toast.warning("Sản phẩm đã tồn tại trong giỏ hàng!");
    }
  } catch (err) {
    console.error(err);
    Toast.alert("Có lỗi khi thêm sản phẩm vào giỏ hàng!");
  }
}