const backBtn = document.querySelector('.back');
const filterMobile = document.querySelector('.filter-mobile');
const filterBtn = document.querySelector('.filter-btn');

function showAndHide(id){
    const idList = "list" + id;
    list = document.getElementById(idList);
    list.classList.toggle("hidden");    
}

backBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});

filterBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});