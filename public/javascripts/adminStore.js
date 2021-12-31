const currentCategoryData = currentCategory;

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
            window.location.href= '/dashboard/store?brandId='+currentCategoryData+'&searchId='+searchId+'&typeId='+typeId;
        })
    });
});