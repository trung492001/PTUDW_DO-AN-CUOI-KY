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

function openModalEditDish(id, name, image, type, price, ingredient, description) {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute('action', `/dish/${id}`);
    formDish.setAttribute('method', 'PATCH');
    document.getElementById('form-dish-name').value = name;
    document.getElementById('form-dish-type').value = type;
    document.getElementById('form-dish-price').value = price;
    document.getElementById('form-dish-ingredient').value = ingredient;
    document.getElementById('form-dish-description').value = description;
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