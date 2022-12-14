const timeCon = document.querySelector(".time-con"),
    btnPlay = document.querySelector(".btn-play"),
    btnPause = document.querySelector(".btn-pause"),
    btnReset = document.querySelector(".btn-reset"),
    btnNote = document.querySelector(".btn-note"),
    stopWatchNoteListGP = document.querySelector(".stop-watch-note-con ul");
// console.log(timeCon,btnPlay,btnPause,btnReset,btnNote,stopWatchNoteListGP);

let [hour,minute,second,millisecond] = [0,0,0,0];
// console.log(hour,minute,second,millisecond);

let result;

// start localStorage Fun
function toGetLocal(toGet){
    let jsonArr = localStorage.getItem(toGet);
    let jsArr;

    !jsonArr ?  jsArr = [] : jsArr = JSON.parse(jsonArr);
    return jsArr;
}

function toAddLocal(toAdd){
    let jsArr = JSON.stringify(toAdd);
    localStorage.setItem("stopWatchNoteArr",jsArr);
}
// End localStorage Fun

let fixedHour, fixedMinute, fixedSecond, fixedMillisecond;
function toFixTime(){
    fixedHour = hour < 10 ? "0" + hour : hour;
    fixedMinute = minute < 10 ? "0" + minute : minute
    fixedSecond = second < 10 ? "0" + second : second;

    fixedMillisecond;
    if(millisecond < 10){
        fixedMillisecond = "000" + millisecond;
    }else if(millisecond < 100){
        fixedMillisecond = "00" + millisecond;
    }else if(millisecond < 1000){
        fixedMillisecond = "0" + millisecond;
    }
}

function toChangeTime(){
    timeCon.innerHTML = `
        <span class="hms-con">
            <span class="hour">${fixedHour}</span> : <span class="min">${fixedMinute}</span> : <span class="sec">${fixedSecond}</span>
        </span>
        <span class="ms">${fixedMillisecond}</span>`;
}

function playFun(){
    // console.log("play");
    // console.log(this);
    
    btnPlay.style.display = btnReset.style.display = "none";
    btnPause.style.display = btnNote.style.display = "block";
   
    result = setInterval(()=>{
       millisecond += 10;

        if(millisecond === 1000){
            millisecond = 0;
            second++;
        }
       
        if(second === 60){
            second = 0;
            minute++;
        }

        if(minute === 60){
            minute = 0;
            hour++;
        }

        toFixTime();
        toChangeTime();
    },10);
}

function pauseFun(){
    // console.log("pause");

    btnPause.style.display = "none";
    btnPlay.style.display = btnReset.style.display = btnNote.style.display = "block";

    clearInterval(result);
}

function resetFun(){
    // console.log("reset");

    btnPause.style.display = btnReset.style.display = btnNote.style.display = "none";
    btnPlay.style.display =  "block";

    clearInterval(result);
    [hour,minute,second,millisecond] = [0,0,0,0];

    toFixTime();
    toChangeTime();
}

function toAddNoteTag(toAdd){
    stopWatchNoteListGP.innerHTML = "";

    for(let idx in toAdd){
        stopWatchNoteListGP.innerHTML += `
            <li class="list-group-item" data-id="${idx}">
                <span class="note-num">${+idx + 1}</span>
                <span class="note-time">${toAdd[idx]}</span>
                <i class="far fa-trash-alt" onclick="toDeleteNote(event)"></i>
            </li>`;
    }
}

function toDeleteNote(e){
    const getDataID = Number(e.currentTarget.parentElement.getAttribute("data-id"));

    let stopWatchNoteJSArr = toGetLocal("stopWatchNoteArr");
    stopWatchNoteJSArr.splice(getDataID,1);

    toAddLocal(stopWatchNoteJSArr);
    toAddNoteTag(stopWatchNoteJSArr);
}

function noteFun(){
    // console.log("note");
 
    let stopWatchNoteJSArr = toGetLocal("stopWatchNoteArr");

    toFixTime();
    const noteTime = fixedHour + " : " + fixedMinute + " : " + fixedSecond + "." + fixedMillisecond;
    stopWatchNoteJSArr.push(noteTime);

    toAddLocal(stopWatchNoteJSArr);
    toAddNoteTag(stopWatchNoteJSArr);
}

btnPlay.addEventListener("click", playFun);
btnPause.addEventListener("click", pauseFun);
btnReset.addEventListener("click", resetFun);
btnNote.addEventListener("click", noteFun);

window.onload = function(){
    const stopWatchCon = document.querySelector(".stop-watch-con"),
        stopWatchNoteCon = document.querySelector(".stop-watch-note-con");

    stopWatchNoteCon.style.setProperty("height", window.innerHeight - (stopWatchCon.scrollHeight + 48) + "px");

    let stopWatchNoteJSArr = toGetLocal("stopWatchNoteArr");
    toAddNoteTag(stopWatchNoteJSArr);
}