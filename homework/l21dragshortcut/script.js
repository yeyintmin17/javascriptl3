const moves = document.getElementsByClassName("moves"),
    moveblock = document.querySelector(".move-block"),
    moveiconcon = document.querySelector(".move-icon-con"),
    moveicons = moveiconcon.querySelectorAll(".move-icon");

// console.log(moves, moveblock, moveiconcon, moveicons);

// for sort (direction > "totop" or "tobot")
function tomakesorttag(wanttags, value, direction){
    // console.log(wanttags, value, direction);

    let distance = 0;
    Array.from(wanttags).forEach((wanttag, idx, arr) => {
        wanttag.parentNode.dataset.myDir = direction;

        distance += value;

        // for left value
        wanttag.style.left = value + "px";

        // for top value
        if(direction === "totop"){
            const reversetag = arr[arr.length - 1 - idx];

            const nextele = reversetag.nextElementSibling;
            if(nextele) distance += nextele.offsetWidth;

            reversetag.style.top = distance + "px";
        }else if(direction === "tobot"){
            const prevele = wanttag.previousElementSibling;
            if(prevele) distance += prevele.offsetWidth;

            wanttag.style.top = distance + "px";
        }
    });
}
tomakesorttag(moveicons, 10, "totop");

// for draggable
function tomakedraggable(dragtags){
    // console.log(dragtags);

    [...dragtags].forEach(dragtag => {
        // console.log(dragtag);

        let isDragging = false, 
        startX, startY,
        moveX, moveY;

        // for touch event
        dragtag.addEventListener("touchstart", (e) => dragstart(e, dragtag));
        dragtag.addEventListener("touchend", (e) => dragend(e, dragtag));
        dragtag.addEventListener("touchmove", dragmove);

        // for mouse event
        dragtag.addEventListener("mousedown", (e) => dragstart(e, dragtag));
        dragtag.addEventListener("mouseup", (e) => dragend(e, dragtag));
        dragtag.addEventListener("mouseleave", (e) => dragend(e, dragtag));
        dragtag.addEventListener("mousemove", dragmove);

        // to check event touch or mouse
        function dragToGetXY(e){
            let targetX, targetY;
            if(e.type.includes("mouse")){
                targetX = e.clientX;
                targetY = e.clientY;
            }else{
                targetX = e.touches[0].clientX;
                targetY = e.touches[0].clientY;
            }

            return [targetX, targetY];
        }

        function dragstart(e, dragtag){
            // console.log("start", e.type, dragtag);

            isDragging = true;
            dragtag.style.zIndex = 100;

            startX = dragToGetXY(e)[0];
            startY = dragToGetXY(e)[1];
            // console.log(startX, startY);
        }

        function dragend(e, dragtag){
            // console.log("end", e.type, dragtag);

            isDragging = false;
            dragtag.style.zIndex = 10;
        }

        function dragmove(e){
            if(isDragging){
                moveX = dragToGetXY(e)[0];
                moveY = dragToGetXY(e)[1];
                // console.log(moveX, moveY);

                let diffX = startX - moveX;
                let diffY = startY - moveY;
                // console.log(diffX, diffY);
                
                dragtag.style.setProperty("left", (dragtag.offsetLeft - diffX) + "px");
                dragtag.style.setProperty("top", (dragtag.offsetTop - diffY) + "px");

                // for restart startX & startY;
                startX = moveX;
                startY = moveY;
            }
        }
    });
}

tomakedraggable(moves);

// for dblclick
let firstclick = 0, secondclick = 0, isdblclick = false;
function tomakedblclick(){
    isdblclick = false;
    if(firstclick === 0){
        firstclick = new Date().getTime();
    }else{
        secondclick = Date.now();
        if(secondclick - firstclick <= 500){
            firstclick = 0;
            isdblclick = true;  
        }else{
            firstclick = secondclick;
        }
    }
}

// for toggle show
moveblock.addEventListener("click", ()=>{
    // console.log("click");

    tomakedblclick();
    
    if(isdblclick){
        // console.log("dblclick");

        const iscontainshow = moveiconcon.classList.contains("show");
        moveiconcon.classList.toggle("show", !iscontainshow);

        if(!iscontainshow){
            const getdir = moveiconcon.dataset["myDir"];
            if(getdir === "totop"){
                tomakesorttag(moveicons, 10, "tobot");
            }else{
                tomakesorttag(moveicons, 10, "totop");
            }
        }
    }
});