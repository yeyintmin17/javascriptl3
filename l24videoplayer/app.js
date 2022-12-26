// Get UI
const getcontainer = document.querySelector(".container");
const getvideoscreen = document.getElementById('videoscreen');

const playbtn = document.getElementById('play');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const stopbtn = document.getElementById('stop');

const progress = document.getElementById('progress');
const getopenfullscreen = document.querySelector('.openfullscreen');
const getclsfullscreen = document.querySelector('.clsfullscreen');
const getdisplaytime = document.getElementById('displaytime');

// console.log(getvideoscreen, playbtn, prevbtn, nextbtn, stopbtn, progress);
// console.log(getopenfullscreen, getclsfullscreen);

const videos = ['samplevideo1', 'samplevideo2'];

let curridx = 0;

loadvideo(videos[curridx]);
function loadvideo(vdo){
    getvideoscreen.src = `../../source/${vdo}.mp4`;
}

function playvdo(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    // play() method came from video api
    getvideoscreen.play();
}

function pausevdo(){
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    
    // pause() method came from video api
    getvideoscreen.pause();
}

function playpausevdo(){
    // console.log(getvideoscreen.paused);

    // paused keyword came from video api
    if(getvideoscreen.paused){
        playvdo();
    }else{
        pausevdo();
    }
}

function nextvdo(){
    curridx++;

    if(curridx > videos.length - 1){
        curridx = 0;
    }

    // console.log(curridx);

    loadvideo(videos[curridx]);
    // playvdo();
}

function previousvdo(){
    curridx--;

    if(curridx < 0){
        curridx = videos.length - 1;
    }

    // console.log(curridx);

    loadvideo(videos[curridx]);
    // playvdo();
}

function stopvideo(){
    getvideoscreen.currentTime = 0;
    pausevdo();
}

function updateprogress(e){
    // Method 1
    // console.log("hi");
    // currentTime & duration came from video api
    // console.log(getvideoscreen.currentTime, getvideoscreen.duration);
    // console.log((getvideoscreen.currentTime / getvideoscreen.duration) * 100);

    // Method 2
    // const currentTime =  e.target.currentTime;
    // const duration = e.target.duration;
    // console.log(e.target, e.currentTarget, e.srcElement, this)

    // Method 3
    // const {currentTime} = e.target;
    // const {duration} = e.target;

    // const {currentTime, duration} = e.target;
    // console.log(currentTime, duration);

    // Method 4
    const [currentTime, duration] = [e.target.currentTime, e.srcElement.duration];
    // console.log(currentTime, duration);

    if(getvideoscreen.currentTime === 0){
        progress.value = 0;
    }else{
        progress.value = (currentTime / duration) * 100;
    }
    // console.log(progress.value, getvideoscreen.currentTime);

    let getmins = Math.floor(getvideoscreen.currentTime / 60);
    // console.log(getmins);

    // if(getmins < 10){
    //     // getmins = '0' + getmins;
    //     getmins = '0' + String(getmins);
    // }

    let getsecs = Math.floor(getvideoscreen.currentTime % 60);
    // console.log(gesecs);

    // if(getsecs < 10){
    //     // getsecs = '0' + getsecs;
    //     getsecs = '0' + String(getsecs);
    // }

    // Method 2
    // Noted: padStart(target length, pad string) must be staring data type
    const minutevalue = getmins.toString().padStart(2, '0');
    const secondvalue = getsecs.toString().padStart(2, '0');
    // console.log(minutevalue, secondvalue)
;
    getdisplaytime.innerText = `${minutevalue} : ${secondvalue}`;
}

// const getdoce = document.documentElement;
function openfullscreen(){
    if(getcontainer.requestFullscreen){
        getcontainer.requestFullscreen(); // standard w3c
    }else if(getcontainer.webkitRequestFullscreen){
        getcontainer.webkitRequestFullscreen(); // chrome, safari
    }else if(getcontainer.mozRequestFullscreen){
        getcontainer.mozRequestFullscreen(); // mozilla
    }else if(getcontainer.msRequestFullscreen){
        getcontainer.msRequestFullscreen(); // microsoft pro, id, edge
    }

    getopenfullscreen.style.display = 'none';
    getclsfullscreen.style.display = 'inline-block';
}

function closefullscreen(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }else if(document.mozCancelFullscreen){
        document.mozCancelFullscreen();
    }else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }

    getclsfullscreen.style.display = 'none';
    getopenfullscreen.style.display = 'inline-block';
}

function setprogress(){
    // console.log('hay');
    // console.log((progress.value * getvideoscreen.duration) / 100);

    getvideoscreen.currentTime = (progress.value * getvideoscreen.duration) / 100;
}

getvideoscreen.addEventListener('timeupdate', updateprogress);

playbtn.addEventListener('click', playpausevdo);
nextbtn.addEventListener('click', nextvdo);
prevbtn.addEventListener('click', previousvdo);
stopbtn.addEventListener('click', stopvideo);

progress.addEventListener('click', setprogress);

getopenfullscreen.addEventListener('click', openfullscreen);
getclsfullscreen.addEventListener('click', closefullscreen);