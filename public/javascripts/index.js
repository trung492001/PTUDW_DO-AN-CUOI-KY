var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

var manualNav = function(manual){
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    btns.forEach((btn) => {
        btn.classList.remove('active');
    });
    slides[manual].classList.toggle('active');
    btns[manual].classList.toggle('active');
};

btns.forEach((btn, i) => {
    btn.addEventListener('click', ()=>{
        manualNav(i);
        currentSlide = i;
    });
});

var repeat = function(activeClass){
    let active = document.getElementsByClassName('active');
    let i= 1;

    var repeater = () => {
        setTimeout(function(){
            [...active].forEach((activeSlide) => {
               activeSlide.classList.remove('active'); 
            });
            slides[i].classList.toggle('active');
            btns[i].classList.toggle('active');
            i++;

            if(slides.length == i){
                i = 0;
            }
            if (i >= slides.length){
                return;
            }
            repeater();
        }, 5000);
    }
    repeater();
}
repeat();