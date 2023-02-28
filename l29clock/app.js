/* Get UI */
const hourel = document.querySelector(".hour");
const minuteel = document.querySelector(".minute");
const secondel = document.querySelector(".second");

function clock(){
    var now = new Date();

    var gettime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
    // console.log(gettime);

    // change time into degree
    var hours = gettime / 60 / 12 * 6;
    var minutes = gettime / 60 * 6;
    var seconds = gettime * 6;
    // console.log(hours, minutes, seconds);

    hourel.style.transform = `rotate(${hours}deg)`;
    minuteel.style.transform = `rotate(${minutes}deg)`;
    secondel.style.transform = `rotate(${seconds}deg)`;
}

clock();
setInterval(clock, 1000);
// setInterval(clock, 50);