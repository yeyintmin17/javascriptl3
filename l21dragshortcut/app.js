const getbox = document.querySelector('.box');
const getbtns = document.querySelector(".btns");
const getboxtitle = document.getElementById("boxtitle")

getbox.addEventListener("click", function(e){
    // console.log("click");
    // getbtns.classList.toggle("show");
    getbtns.classList.add("show");

    // console.log(e.target);
    smallmenu(e.target);
});

getbox.addEventListener("dblclick", function(){
    getbtns.classList.remove("show");
});

dragme(getbox);

function dragme(getele){
    // console.log(getele);

    var getcx, getcy, setcx, setcy;

    // design 1
    // getele.onmousedown = getmousedown;

    // design 2
    if(getele){
        getboxtitle.onmousedown = getmousedown;
    }

    function getmousedown(e){
        // console.log('i am working');
        // console.log(e.target);

        getcx = e.clientX;
        getcy = e.clientY;
        // console.log(getcx, getcy);

        document.onmousemove = dragme;
        document.onmouseup = stopdragme;

        // getbtns.classList.remove("show");
    }

    function dragme(e){
        // console.log(e.target);
        // console.log(getcx,getcy);

        setcx = getcx - e.clientX;
        setcy = getcy - e.clientY;

        getcx = e.clientX;
        getcy = e.clientY;

        // console.log(getcx, setcx);
        // console.log(getcy, setcy);

        const btnleft = getele.offsetLeft;
        const btntop = getele.offsetTop;
        // console.log(btnleft,btntop);

        getele.style.left = (btnleft - setcx) + "px";
        getele.style.top = (btntop - setcy) + "px";

        // console.log(btnleft - setcx, btntop - setcy);

        getbtns.classList.remove("show");
    }

    function stopdragme(){
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function smallmenu(icobox){
    // console.log(icobox);

    if(icobox.classList.contains('btn-icon')){
        console.log("yes");
    }else{
        console.log("no");
    }
}