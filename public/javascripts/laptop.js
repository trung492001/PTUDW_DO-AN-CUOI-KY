const backBtn = document.querySelector('.back');
const filterMobile = document.querySelector('.filter-mobile');
const filterPC = document.querySelector('.filter-pc');
const filterBtn = document.querySelector('.filter-btn');
const productData = products;

function showAndHide(device, id){
    const idList = "list" + id;
    let list;
    if(device === 'pc')
        list = filterPC.querySelector(`#${idList}`);
    else
        list = filterMobile.querySelector(`#${idList}`);
    list.classList.toggle("hidden");
    
}

backBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});

filterBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});

$(document).ready(function() {
    $('.checkBox').click(function() {
        let id = $(this).closest('.items-center').attr('id');
        let typeId = $(this).val(); 
        $.post('/filter', {
            filter: id,
            type: typeId
        })
        $.get('/laptop');
    });
});