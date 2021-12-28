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
    formDish.setAttribute('action', '/addNewProduct');
    formDish.setAttribute('method', 'POST');
    document.getElementById('modal-label').innerText = 'Add Product';
    document.getElementById('form-dish-submit').value = 'Add Product';
    document.getElementById('dish-modal').classList.remove('hidden');
}

function openModalEditDish(id, name, price, information1, information3, information4, information5, information6, information7, information8, brand, type, ramType, cpuType) {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute('action', `/editProduct?productId=${id}`);
    formDish.setAttribute('method', 'POST');
    document.getElementById('form-dish-name').value = name;
    document.getElementById('form-dish-price').value = price;
    document.getElementById('form-dish-type').value = type;
    document.getElementById('form-dish-brand').value = brand;
    document.getElementById('form-dish-ram').value = ramType;
    document.getElementById('form-dish-cpu').value = cpuType;
    document.getElementById('form-dish-manhinh').value = information1;
    document.getElementById('form-dish-card').value = information3;
    document.getElementById('form-dish-luutru').value = information4;
    document.getElementById('form-dish-pin').value = information5;
    document.getElementById('form-dish-ketnoichinh').value = information6;
    document.getElementById('form-dish-cannang').value = information7;
    document.getElementById('form-dish-hedieuhanh').value = information8;
    document.getElementById('modal-label').innerText = 'Edit Product';
    document.getElementById('form-dish-submit').value = 'Edit Product';
    document.getElementById('dish-modal').classList.remove('hidden');

}

function openModalDeleteDish(id){
    document.getElementById('form-delete-dish').setAttribute('action', `/deleteProduct?productId=${id}`);
    document.getElementById('delete-dish-modal').classList.remove('hidden');
}

function closeModalDish() {
    document.getElementById('dish-modal').classList.add('hidden');
}

function closeModalDeleteDish() {
    document.getElementById('delete-dish-modal').classList.add('hidden');
}

function closeModalCategory() {
    document.getElementById('category-modal').classList.add('hidden');
}

function openModalAddCategory() {
    const formCategory = document.getElementById('category-form');
    formCategory.reset();
    formCategory.setAttribute('action', '/addNewCategory');
    formCategory.setAttribute('method', 'POST');
    document.getElementById('category-label').innerText = 'Thêm hãng';
    document.getElementById('category-submit').value = 'Thêm hãng';
    document.getElementById('category-modal').classList.remove('hidden');
}