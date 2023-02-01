// Get UI
const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form');
const gettranstatuses = document.querySelectorAll('.form-check-input');
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const openbtn = document.getElementById('open-btn');
const gethisbox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');

// console.log(balance, moneydeb, moneycrd, getform, gettranstatuses, getamount, getdate, getremark, getlistgroup);

// const dummydatas = [
//     {id: 1, remark: 'Petty Cash', transtatus: "+", amount: 1000, date: "2023-01-20"},
//     {id: 2, remark: 'Pen', transtatus: "-", amount: -20, date: "2023-01-21"},
//     {id: 3, remark: 'Other Income', transtatus: "+", amount: 300, date: "2023-01-25"},
//     {id: 4, remark: 'Book', transtatus: "-", amount: -10, date: "2023-01-25"},
//     {id: 5, remark: 'Water', transtatus: "-", amount: -150, date: "2023-01-25"},
//     {id: 6, remark: 'Teamix', transtatus: "-", amount: -100, date: "2023-01-25"}
// ];
// console.log(dummydatas);

const getlsdatas = JSON.parse(localStorage.getItem('transactions'));
let gethistories = localStorage.getItem('transactions') !== null ? getlsdatas : [];
// console.log(getlsdatas, gethistories);

var sign = "-";
// Get Sign
gettranstatuses.forEach(function(gettranstatus){
    gettranstatus.addEventListener('change', function(){
        // console.log(this.value);

        if(this.value === "debit"){
            sign = "+";
        }else if(this.value === "credit"){
            sign = "-";
        }

        // console.log(sign);
    });
});

function init(){
    getlistgroup.innerHTML = '';

    // Method 1
    // dummydatas.forEach(function(dummydata){
    //     // console.log(dummydata);
    //     addtoui(dummydata);
    // });

    // Method 2
    // dummydatas.forEach(dummydata => addtoui(dummydata));

    // Method 3 ***
    // dummydatas.forEach(addtoui);

    gethistories.forEach(addtoui);

    totalvalue();
}
init();

// Create li to ul
function addtoui(transaction){
    // console.log(transaction);
    // console.log(transaction.amount, typeof transaction.amount);

    const newli = document.createElement('li');
    newli.className = 'list-group-item';
    newli.classList.add(transaction.transtatus === "+" ? 'inc' : 'dec');

    newli.innerHTML = ` 
        ${transaction.remark} 
        <span>${transaction.transtatus}${Math.abs(transaction.amount)}</span> 
        <span>${transaction.date}</span>
        <button type="button" class="delete-btn" onclick="removetransation(${transaction.id})">&times;</button>`;

    getlistgroup.appendChild(newli);
}

function totalvalue(){
    const amounts = gethistories.map(gethistory => gethistory.amount);
    // console.log(amounts);

    // Method 1
    // const result = amounts.reduce(function(total, curvalue){
    //     total += curvalue;
    //     return total;
    // }, 0).toFixed(2);

    // Method 2
    const totalresult = amounts.reduce((total, curvalue) => (total += curvalue), 0).toFixed(2);

    const debitesult = amounts
        .filter(amount => amount > 0)
        .reduce((total, curvalue) => (total += curvalue), 0).toFixed(2);

    const creditresult = (amounts
        .filter(amount => amount < 0)
        .reduce((total, curvalue) => (total += curvalue), 0) * -1).toFixed(2);

    // console.log(totalresult, debitesult, creditresult);

    balance.innerText = `${totalresult}`;
    moneydeb.innerText = `${debitesult}`;
    moneycrd.innerText = `${creditresult}`;
}
// totalvalue();

function generateidx(){
    return Math.floor(Math.random() * 100000);
}

// Update Local Storage
function updatlocalstorage(){
    localStorage.setItem('transactions', JSON.stringify(gethistories));
}

function removetransation(tranid){
    gethistories = gethistories.filter(gethistory => gethistory.id !== tranid);

    updatlocalstorage();
    init();
}

function newtransition(e){
    // console.log('hay');
    e.preventDefault();

    if(isNaN(amount.value) || amount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === ''){
        alert('Oh!!! Some Data are missing.');
    }else{
        const transaction = {
            id: generateidx(),
            remark: getremark.value,
            transtatus: sign,
            amount: sign === "-" ? Number(-getamount.value) : Number(getamount.value),
            date: getdate.value
        }
        // console.log(transaction);

        gethistories.push(transaction);
        updatlocalstorage();

        totalvalue();

        addtoui(transaction);

        getamount.value = '';
        getdate.value = '';
        getremark.value = '';
        getamount.focus();
    }
}
getform.addEventListener('submit',  newtransition);

openbtn.addEventListener('click', function(){
    gethisbox.classList.toggle('show');
});

// reduce Mathod

// var myarrs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
// array.reduce(function(total, curentValue, currentIndex, array){}, initialValue);

// var result = myarrs.reduce(function(total, value, idx, arr){
//     // console.log(total, value, idx, arr);
//     /* 
//         if initialValue = "" 
//         total = 10 to undefined
//         value = 20 to 100
//         idx = 1 to 9
//         arr = array
//     */ 

//     /* 
//         if initialValue = 0 
//         total = 0 to undefined
//         value = 10 to 100
//         idx = 0 to 9
//         arr = array
//     */
   
//     /* 
//         if initialValue = 1
//         total = 1 to undefined
//         value = 10 to 100
//         idx = 0 to 9
//         arr = array
//     */

//     total += value;
//     // console.log(total);

//     return total;
// });

// console.log(result);