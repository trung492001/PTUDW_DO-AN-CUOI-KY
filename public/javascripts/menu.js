function openModalAddDish() {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute("action", "/dish");
    formDish.setAttribute("method", "POST");
    document.getElementById('dish-modal').classList.remove('hidden');
    document.getElementById('modal-label').innerText = "Add dish";
}

function openModalEditDish(dishId, dishName, dishPrice,) {
    const formDish = document.getElementById('dish-form');
    formDish.reset();
    formDish.setAttribute("action", `/dish/${dishId}`);
    formDish.setAttribute("method", "PATCH");
}

function closeModalDish() {
    document.getElementById('dish-modal').classList.add('hidden');
}