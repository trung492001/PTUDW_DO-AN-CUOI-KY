function openModalAddDish(){
    document.getElementById('dish-form').reset();
    document.getElementById('dish-modal').classList.remove('hidden');
    document.getElementById('modal-label').innerText = "Add dish";
}

function closeModalDish(){
    document.getElementById('dish-modal').classList.add('hidden');
}