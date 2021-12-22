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

function openModalAddDish() {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute('action', '/adminProduct');
    formDish.setAttribute('method', 'POST');
    document.getElementById('modal-label').innerText = 'Add Product';
    document.getElementById('form-dish-submit').value = 'Add Product';
    document.getElementById('dish-modal').classList.remove('hidden');
}

function openModalEditDish(id, name, price) {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute('action', `/adminProduct/${id}`);
    formDish.setAttribute('method', 'POST');
    document.getElementById('form-dish-name').value = name;
    document.getElementById('form-dish-price').value = price;
    document.getElementById('modal-label').innerText = 'Edit Product';
    document.getElementById('form-dish-submit').value = 'Edit Product';
    document.getElementById('dish-modal').classList.remove('hidden');

}

function openModalDeleteDish(id){
    document.getElementById('form-delete-dish').setAttribute('action', `/adminProduct/${id}`);
    document.getElementById('delete-dish-modal').classList.remove('hidden');
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