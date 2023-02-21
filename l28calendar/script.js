// Get UI
var getyearbtn = document.querySelector('.year-btn');

var getcurmonth = document.getElementById("curmonth");
var getcuryear = document.getElementById("curyear");

var getuimonths =  document.getElementById("months");
var getuiyears =  document.getElementById("years");

var getcaldays = document.getElementById("caldays");

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startyear = 2020;
var endyear = 2025;

var month, year;

window.addEventListener('load', function(){
    // console.log("hay I am working");

    var svday = new Date();
    month = svday.getMonth(); // 1
    year = svday.getFullYear(); // 2020
    // console.log(month, year);

    getcurmonth.textContent = months[month];
    getcuryear.innerText = year;

    initmonths();
    inityears();
    initdays();
});

function initmonths(){
    getuimonths.innerHTML = "";

    for(var x = 0; x < months.length; x++){
        var newdiv = document.createElement("div");
        newdiv.classList.add("dropdown-item");
        newdiv.textContent = months[x];

        newdiv.onclick = (
            function(){
                // console.log("hay");

                return function(){
                    initdays();
                }
            }
        )();
       
        getuimonths.appendChild(newdiv);
    }
}

function inityears(){
    getuiyears.innerText = "";
    
    for(var x = startyear; x <= endyear; x++){
        var newdiv = document.createElement("div");
        newdiv.className = "dropdown-item";
        newdiv.innerText = x;
       
        getuiyears.appendChild(newdiv);
    }
}

function initdays(){
    getcaldays.innerHTML = '';

    var tmpdays = new Date(year, month, 0);
    // console.log(tmpdays); // Tue Jan 31 2023 00:00:00 GMT+0630 (Myanmar Time)

    var getalldays = alldays(year, month);
    // console.log(getalldays);

    var getweekday = tmpdays.getDay();
    // console.log(getweekday); // 2 (means Tuesday)

    // getcarry space for previous days
    for(var i = 0; i <= getweekday; i++){
        // console.log(i);

        var newdiv = document.createElement("div");
        newdiv.className = "day blank";

        getcaldays.appendChild(newdiv);
    }

    for(var x = 0; x < getalldays; x++){
        // console.log(x);

        var addday = x + 1;

        var newdiv = document.createElement("div");
        newdiv.classList.add('day');
        newdiv.textContent = addday;

        getcaldays.appendChild(newdiv);
    }
}

function alldays(year, month){
    // console.log(year, month);

    // new Date(year, month, day)
    // console.log(new Date()); // Tue Feb 21 2023 10:42:32 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023, 1, 10)); // Fri Feb 10 2023 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023, 1, 0)); // Tue Jan 31 2023 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023, 0, 0)); // Sat Dec 31 2022 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023, 5, 0)); // Wed May 31 2023 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023, 1, 30)); // Thu Mar 02 2023 00:00:00 GMT+0630 (Myanmar Time)

    var curalldays = new Date(year, month + 1, 0);
    // console.log(curalldays);
    curalldays = curalldays.getDate();
    // console.log(curalldays);
    
    return curalldays;
}

getyearbtn.addEventListener('click', function(){
    if(this.lastElementChild.classList.contains('show')){
        this.lastElementChild.classList.remove('show');
    }else{
        this.lastElementChild.classList.add('show');
    }
})