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

const dummydatas = [
    {id: 1, remark: 'Petty Cash', transtatus: "+", amount: 1000, date: "2023-01-20"},
    {id: 2, remark: 'Pen', transtatus: "-", amount: -20, date: "2023-01-21"},
    {id: 3, remark: 'Other Income', transtatus: "+", amount: 300, date: "2023-01-25"},
    {id: 4, remark: 'Book', transtatus: "-", amount: -10, date: "2023-01-25"},
    {id: 5, remark: 'Water', transtatus: "-", amount: -150, date: "2023-01-25"},
    {id: 6, remark: 'Teamix', transtatus: "-", amount: -100, date: "2023-01-25"}
];
// console.log(dummydatas);

const getlsdatas = JSON.parse(localStorage.getItem('transaction'));
let gethistories = localStorage.getItem('transaction') !== null ? getlsdatas : [];
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

    // Method 3
    dummydatas.forEach(addtoui);
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
        <button type="button" class="delete-btn">&times;</button>`;

    getlistgroup.appendChild(newli);
}

function newtransition(e){
    // console.log('hay');
    e.preventDefault();

    if(isNaN(amount.value) || amount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === ''){
        alert('Oh!!! Some Data are missing.');
    }else{
        const transaction = {
            id: 1000,
            remark: getremark.value,
            transtatus: sign,
            amount: sign === "-" ? Number(-getamount.value) : Number(getamount.value),
            date: getdate.value
        }
        // console.log(transaction);

        gethistories.push(transaction);
        addtoui(transaction);
    }
}
getform.addEventListener('submit',  newtransition);

openbtn.addEventListener('click', function(){
    gethisbox.classList.toggle('show');
});