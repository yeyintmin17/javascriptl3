// Get UI

const getgamecnt = document.getElementById('game-container');

const minnum = document.querySelector('.minnumber'),
    maxnum = document.querySelector('.maxnumber');

const getinput = document.querySelector('#guessnumber');
const getbtn = document.querySelector('#btn');

const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');

const getmicbtn = document.getElementById('mic-btn');
const getvoccnt = document.getElementById('voice-container')

let min = 1, max = 10, gameleft = 3, winningnum = 5;

minnum.innerText = min;
maxnum.textContent = max;

function randomnum(min, max){
    // console.log(min, max);;
    let getrdm = Math.floor(Math.random() * (max - min) + 1);
    return getrdm;
}
// console.log(winningnum);
// console.log(Math.floor(Math.random() * (max - min) + 1));
// console.log(Math.floor(Math.random() * (max + 1)));

function setmessage1(msg, color){
    message1.textContent = msg;
    message1.style.color = color;
}

function setmessage2(msg, color){
    message2.textContent = msg;
    message2.style.color = color;
}

function gamerover(won, msg){
    let color;

    won === true ? color = "green" : color = "red";

    getinput.disabled = true;
    getinput.style.borderColor = color;

    setmessage1(msg, color);

    getbtn.value = "Play Again";
    getbtn.classList.add('playagain');
}

getbtn.addEventListener('click', function(){
    let guess = +getinput.value;
    // console.log(guess);

    if(guess < min || guess > max || isNaN(guess)){
        setmessage2(`Please enter a numbet between ${min} to ${max}`, 'red');
    }

    if(guess === winningnum){
        // Game Over WON
        gamerover(true, `${winningnum} is correct!!!, You Won`);
    }else{
        gameleft--;

        if(gameleft === 0){
            // Game Over LOSE
            gamerover(false, `Game Over You Lost, The correct number is ${winningnum}`);
        }else{
            // Continue Game
            getinput.style.borderColor = "red";
            getinput.value = "";

            setmessage1(`${guess} is not correct, ${gameleft} guess left`, 'blue');
        }
    }
});

getgamecnt.addEventListener('mousedown', function(e){
    console.log(e.target);

    if(e.target.classList.contains('playagain')){
        window.location.reload();
    }
});

// For Chrome Browser Support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// console.log(window.SpeechRecognition);

let getrec = new window.SpeechRecognition;
// console.log(getrec);

getmicbtn.addEventListener("click", function(){
    // console.log('working');

    // Start Recognition, start() come from Recognition api
    getrec.start();

    getrec.addEventListener('result', (e) => talking(e));
});

function talking(ele){
    // console.log(ele);

    const micresult = ele.results[0][0].transcript;
    // console.log(micresult);

    micmessage(micresult);
    getnumber(micresult);
}

function micmessage(msg){
    // console.log(msg);

    getvoccnt.innerHTML = `<span class="voicemessage">Did you say !!! ${msg}</span>`;
}

function getnumber(msg){
    const getnum = +msg;
    // console.log(typeof getnum);

    getinput.value = getnum;
}