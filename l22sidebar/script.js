// Get UI
const openbtn = document.querySelector('.open-btn');
const closebtn = document.querySelector('.close-btn');
const getnav = document.querySelector('.nav');

openbtn.addEventListener("click", function(){
    getnav.classList.add('visible');
});

closebtn.addEventListener("click", function(){
    getnav.classList.remove('visible');
});