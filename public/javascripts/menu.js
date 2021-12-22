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
    formDish.setAttribute('action', '/dish');
    formDish.setAttribute('method', 'POST');
    document.getElementById('modal-label').innerText = 'Add dish';
    document.getElementById('form-dish-submit').value = 'Add dish';
    document.getElementById('dish-modal').classList.remove('hidden');
}

function openModalEditDish(id, name, price) {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute('action', `/dish/${id}`);
    formDish.setAttribute('method', 'POST');
    document.getElementById('form-dish-name').value = name;
    document.getElementById('form-dish-price').value = price;
    document.getElementById('modal-label').innerText = 'Edit dish';
    document.getElementById('form-dish-submit').value = 'Edit dish';
    document.getElementById('dish-modal').classList.remove('hidden');

}

function openModalDeleteDish(id){
    document.getElementById('form-delete-dish').setAttribute('action', `/dish/${id}`);
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
    const formDish = document.getElementById('category-form');
    formDish.reset();
    formDish.setAttribute('action', '/addCategory');
    formDish.setAttribute('method', 'POST');
    document.getElementById('category-label').innerText = 'Thêm hãng';
    document.getElementById('category-submit').value = 'Thêm hãng';
    document.getElementById('category-modal').classList.remove('hidden');
}