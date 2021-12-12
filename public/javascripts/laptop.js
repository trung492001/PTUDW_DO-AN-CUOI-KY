function showAndHide(id){
    const idList = "list" + id;
    list = document.getElementById(idList);
    list.classList.toggle("hidden");    
}