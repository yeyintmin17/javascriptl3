var getimgs = document.querySelectorAll('.img')
// console.log(getimgs); // Nodelist

var getmodal = document.querySelector(".modal");
var getbtnclose = document.querySelector(".btn-close");
var getviews = document.getElementsByClassName("view");
// console.log(getviews) // HTMLCollection

var getprevbtn = document.querySelector(".prev");
var getnextbtn = document.querySelector(".next");
var getcounter = document.querySelector(".counter");
var getcaption = document.querySelector(".caption");
var getnoactives = document.getElementsByClassName("noactive");
// console.log(getnoactives) // HTMLCollection
// console.log(getnextbtn,getprevbtn)

// console.log(getmodal,getbtnclose,getviews,getcounter,getcaption);

var curidx = 1;

for(var i = 0; i < getimgs.length; i++){
    // console.log(getimgs[i]);
    // getimgs[i].addEventListener('click',showmodal);

    getimgs[i].addEventListener('click',function(e){
        showmodal();

        // console.log(e.target.alt);
        // console.log(this.alt);

                                            // remove space
        const findids = this.alt.split('').filter(rmspace => rmspace.trim() !== '');
        // console.log(findids);
        // console.log(findids[findids.length - 1]);

        curidx = Number(findids[findids.length - 1]);
        // console.log(curidx);
        // console.log(typeof curidx);

        // Method 1
        // const findids = this.alt;
        // console.log(findids);
        // console.log(typeof findids);
        // console.error(findids[6]);
        // console.log(findids[findids.length - 1]);

        // Method 2
        // const findids = this.alt.split('').filter(rm => rm.trim() !== '');
        // console.log(findids);
        // console.log(findids[findids.length - 1]);

        slideshow(curidx);
    });
}

function showmodal(){
    getmodal.style.display = "block";
}

// getbtnclose.addEventListener("click",function(){
//     getmodal.style.display = "none";
// });

getbtnclose.onclick = function(){
    getmodal.style.display = "none";
};

document.addEventListener("click",function(e){
    // console.log(e.target)

    if(e.target === getmodal){
        getmodal.style.display = "none";
    }
});

function currentview(num){
    // curidx = num;
    slideshow(curidx = num);
}

getnextbtn.addEventListener("click",function(){
    // console.log('i am next');
    slideshow(curidx += 1);
});

getprevbtn.addEventListener("click", function(){
    // console.log('i am prev');
    slideshow(curidx -= 1);

    if(curidx < 1){
        curidx = getviews.length;
    }
});

// slideshow(curidx);

function slideshow(num){
    // console.log(num);

    var x;
    for(x = 0; x < getviews.length; x++){
        getviews[x].style.display = "none";
    }

    for(x = 0; x < getnoactives.length; x++){
        // getnoactives[x].classList.remove("active");

        // console.log(getnoactives[x].className)
        // console.log(getnoactives[x].className.replace(" active", ""));
        // console.log(getnoactives[x].className.replace("active", ""))
        getnoactives[x].className = getnoactives[x].className.replace(" active", "");
    }

    if(num > getviews.length){
        num = 1;
        curidx = 1;
    }

    if(num < 1){ // 2 < 1
        num = getviews.length;
        curidx = getviews.length;
    }

    // console.log("this is curidx = ", curidx);
    // console.log("this is num = ", num);

    getcounter.textContent = `${num} / ${getviews.length}`;

          // 1 - 1 = 0;
    getviews[num-1].style.display = "block";
    getnoactives[num-1].className += " active";
    getcaption.innerText = getnoactives[num-1].alt;
};