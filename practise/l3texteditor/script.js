// for tooltip
const tooltips = document.querySelectorAll("[data-bs-toggle='tooltip']");
[...tooltips].forEach(tooltip => new bootstrap.Tooltip(tooltip));

// for textarea
const myTextarea = document.querySelector(".my-textarea");
myTextarea.contentEditable = true;
myTextarea.spellcheck = false;

// for btns 
const myCommandBtns = document.querySelectorAll("[data-my-command]");
// console.log(myCommandBtns);

Array.from(myCommandBtns).forEach(myCommandBtn => {
    const commandName = myCommandBtn.dataset.myCommand.toUpperCase()
    // console.log(commandName);
    if(commandName === "BACKCOLOR" || commandName === "FORECOLOR" || commandName === "FONTNAME"){
        myCommandBtn.addEventListener("change", () => {
            const commandName = myCommandBtn.dataset.myCommand.toLowerCase();
            // console.log(commandName);
    
            if(commandName === "backcolor" || commandName === "forecolor" || commandName === "fontname"){
                document.execCommand(commandName, false, myCommandBtn.value);
            }
        });
    }else{
        myCommandBtn.addEventListener("click", () => {
            const commandName = myCommandBtn.dataset.myCommand.toLowerCase();
            // console.log(commandName);
    
            if(commandName === "text-uppercase" || commandName === "text-lowercase" || commandName === "text-capitalize"){
                myTextarea.classList.toggle(commandName);
            }else if(commandName === "createlink" || commandName === "insertimage"){
                const getLink = window.prompt("Enter your website link", "https://");
                // console.log(getLink);
    
                document.execCommand(commandName, false, getLink);
            }else if(commandName === "clear"){
                myTextarea.innerHTML = "";  
            }else{
                document.execCommand(commandName, false, null);
            }
        });
    }
});

// for fullscreen
const myCon = document.querySelector(".my-container"),
    myFullscreenBtn = document.querySelector(".my-fullscreen-btn");
// console.log(myCon, myFullscreenBtn);

myFullscreenBtn.onclick = () => {
    if(!document.fullscreenElement){
        myCon.classList.add("fullscreen");

        const de = document.documentElement;
        if(de.requestFullscreen){
            de.requestFullscreen();
        }else if(de.msRequestFullscreen){
            de.msRequestFullscreen();
        }else if(de.webkitRequestFullscreen){
            de.webkitRequestFullscreen();
        }
    }else{
        myCon.classList.remove("fullscreen");

        if(document.exitFullscreen){
            document.exitFullscreen();
        }else if(document.msExitFullscreen){
            document.msExitFullscreen();
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    };
};