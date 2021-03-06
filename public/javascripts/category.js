const backBtn = document.querySelector('.back');
const filterMobile = document.querySelector('.filter-mobile');
const filterBtn = document.querySelector('.filter-btn');
const filterPC = document.querySelector('.filter-pc');

function showAndHide(device, id){
    const idList = "list" + id;
    let list;
    if(device === 'pc')
        list = filterPC.querySelector(`#${idList}`);
    else
        list = filterMobile.querySelector(`#${idList}`);
    list.classList.toggle("hidden");
}


$(document).ready(function() {
    $('.sort').click(function() {
        if(document.URL.includes('sort=1')) {
            if($(this).attr('id') === 'ascending') {
                window.location.href=document.URL;
            } else {
                window.location.href=document.URL.replace(/sort=1/g,'sort=2')
            }
        } else if(document.URL.includes('sort=2')) {
            if($(this).attr('id') === 'ascending') {
                window.location.href=document.URL.replace(/sort=2/g,'sort=1')
            } else {
                window.location.href=document.URL
            }
        } else {
            if(document.URL.includes('?')) {
                if($(this).attr('id') === 'ascending') {
                    window.location.href=document.URL + '&sort=1'
                } else {
                    window.location.href=document.URL + '&sort=2'
                }
            } else {
                if($(this).attr('id') === 'ascending') {
                    window.location.href=document.URL + '?sort=1'
                } else {
                    window.location.href=document.URL + '?sort=2'
                }
            }
        }
    })
    
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
            function getUrlVars()
            {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }
            let brandId = getUrlVars().brandId;
            window.location.href= '/category?brandId='+brandId+'&searchId='+searchId+'&typeId='+typeId;
        })
    });
});

backBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});

filterBtn.addEventListener('click', () =>{
    filterMobile.classList.toggle('translate-x-full');
});