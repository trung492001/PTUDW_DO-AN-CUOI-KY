const { $ } = require("../../validation/account/register.validation");

const backBtn = document.querySelector('.back');
const filterMobile = document.querySelector('.filter-mobile');
const filterBtn = document.querySelector('.filter-btn');
const productData = products;

function showAndHide(id){
    const idList = "list" + id;
    list = document.getElementById(idList);
    list.classList.toggle("hidden");    
}


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

backBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});

filterBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});