window.onclick = (event) => {
    if (!event.target.matches('#dropdown-btn')) {
        const dropdownList = document.querySelectorAll('[id^="dropdown-content-"]');
        for (const dropdown of dropdownList) {
            dropdown.classList.add("hidden");
        }
    }
}

function toggleDropdown(id) {
    document.getElementById(`dropdown-content-${id}`).classList.toggle("hidden");
}

function openModalAddProduct() {
    const formProduct = document.getElementById('product-form');
    formProduct.reset();
    formProduct.setAttribute('action', '/addProduct');
    formProduct.setAttribute('method', 'POST');
    document.getElementById('modal-label').innerText = 'Thêm sản phẩm';
    document.getElementById('form-product-submit').value = 'Thêm sản phẩm';
    document.getElementById('product-modal').classList.remove('hidden');
}

function openModalEditProduct(id, name, price) {
    const formProduct = document.getElementById('product-form');
    formProduct.reset();
    formProduct.setAttribute('action', `/product/${id}`);
    formProduct.setAttribute('method', 'POST');
    document.getElementById('form-product-name').value = name;
    document.getElementById('form-product-price').value = price;
    document.getElementById('modal-label').innerText = 'Cập nhật thông tin';
    document.getElementById('form-product-submit').value = 'Cập nhật';
    document.getElementById('product-modal').classList.remove('hidden');

}

function openModalDeleteProduct(id){
    document.getElementById('form-delete-product').setAttribute('action', `/product/${id}`);
    document.getElementById('delete-product-modal').classList.remove('hidden');
}

function closeModalProduct() {
    document.getElementById('product-modal').classList.add('hidden');
}

function closeModalDeleteProduct() {
    document.getElementById('delete-product-modal').classList.add('hidden');
}

function closeModalCategory() {
    document.getElementById('category-modal').classList.add('hidden');
}

function openModalAddCategory() {
    const formCategory = document.getElementById('category-form');
    formCategory.reset();
    formCategory.setAttribute('action', '/addCategory');
    formCategory.setAttribute('method', 'POST');
    document.getElementById('category-label').innerText = 'Thêm hãng';
    document.getElementById('category-submit').value = 'Thêm hãng';
    document.getElementById('category-modal').classList.remove('hidden');
}