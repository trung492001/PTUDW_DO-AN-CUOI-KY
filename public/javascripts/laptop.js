const backBtn = document.querySelector('.back');
const filterMobile = document.querySelector('.filter-mobile');
const filterBtn = document.querySelector('.filter-btn');


function showAndHide(id){
    const idList = "list" + id;
    list = document.getElementById(idList);
    list.classList.toggle("hidden");    
}


$(document).ready(function() {
    $('.checkBox').click(function() {
        var names = [];
        $('input:checked').each(function() {
            names.push(
                {   
                    id: $(this).closest('.items-center').attr('id'),
                    type: this.value
                });
        });
        let searchId = '';
        let typeId = '';
        for(let i = 0; i < names.length; i++) {
            if(i === names.length - 1) {
                searchId += names[i].id;
                typeId += names[i].type;
            } else {
                searchId += names[i].id+'_';
                typeId += names[i].type+'_';
            }
        }
        $('.filter').click(function() {
            window.location.href= '/laptop?searchId='+searchId+'&typeId='+typeId;
        })
    });
});

backBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});

filterBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});