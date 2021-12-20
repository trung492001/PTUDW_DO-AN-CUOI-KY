const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle("hidden");
});

let search = $('#listResult');

function showResults(str){
    if(str.length === 0){
        search.addClass("hidden");
        search.removeClass("flex");
    }else{
        search.removeClass("hidden");
        search.addClass("flex");
    }

    $.ajax({
        url:"/",
        contentType: "application/json",
        method:"POST",
        data: JSON.stringify({query: str}),
        success: function(result){
            search.html(result.response);
        }
    })
}
