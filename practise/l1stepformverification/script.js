const dots = Array.from(document.getElementsByClassName("dot")),
    regForm = document.getElementById("reg-form"),
    pages = [...document.querySelectorAll(".page")],
    formControls = [...document.querySelectorAll(".form-control")],
    btnNext = document.querySelector(".btn-next"),
    btnPrev = document.querySelector(".btn-prev"),
    resultCon = document.getElementById("result-container");

let formIdx = 0; toPass = true;

// start to make toPass

function toMakePass(input,btnSign){
    toPass = true;

    if(input.value.length < 1){
        // console.log("first")
        toPass = false;
        if(btnSign === "next") window.alert("Fill the form fully !!!");
    }else if(input.name === "email"){
        // console.log("second");
        if(!input.value.includes("@gmail.com")) {
            toPass = false;
            if(btnSign === "next") window.alert("Fill the email correctly !!!");
        }
    }else if(input.name === "password"){
        // console.log("third");
        if(input.value.length < 5) {
            toPass = false;
            if(btnSign === "next") window.alert("Password must be at least 5");
        }
    }else if(input.name === "phone"){
        // console.log("fourth");
        if(input.value.length < 12) {
            toPass = false;
            if(btnSign === "next") window.alert("Fill the phone number correctly !!!");
        }
    }

    if(toPass){
        input.parentElement.classList.remove("invalid");
    }else{
        input.parentElement.classList.add("invalid");
        input.focus();
    }
}

// end to make toPass

// start to change page

function toChangePage(btnSign){
    toPass = true;

    // to check form correctly !!!
    let pages = [...document.querySelectorAll(".page")], // current page before click btn-next
        formConrols = [...pages[formIdx].getElementsByClassName("form-control")]; // current inputs from current page
    if(btnSign === "next" || btnSign === "prev"){
        formConrols.forEach(input => {
            if(!toPass) return;

            toMakePass(input,btnSign);

            // to check dot is finished ??? && to add invalid (border-color: red;)
            if(toPass) {
                dots[formIdx].classList.add("finished");
            }else{
                dots[formIdx].classList.remove("finished");
            }
        });
    }

    if(btnSign === "prev") toPass = true; // form correct or not will pass

    if(!toPass) return;
    // console.log("finished");

    // to restart dots & pages
    dots.forEach(value => value.classList.remove("actived"));
    pages.forEach(value => value.style.display = "none");
    
    // to increase and descrease
    if(btnSign === "next"){
        formIdx++;
    }else if(btnSign === "prev"){
        formIdx--;
    }else if(btnSign > -1){
        formIdx = btnSign;
    }

    // to show success
    if(formIdx >= pages.length){ // 2 >= 3
        let regObj = {};
        [...document.querySelectorAll(".form-control")].forEach(input => {
            regObj[input.name] = input.value;
        });
        // console.warn(regObj);

        regForm.style.display = "none";
        resultCon.style.display = "block";

        resultCon.innerHTML = "";

        const newH1Tag = document.createElement("h1");
        newH1Tag.className = "stroke-success";
        newH1Tag.innerText = "Successfull";

        const newULTag = document.createElement("ul");
        newULTag.className = "list-group";

        for(let key in regObj){
            const newLITag = document.createElement("li");
            newLITag.className = "list-group-item";
            newLITag.innerText = `${key}: ${regObj[key]}`;
            newULTag.appendChild(newLITag);
        }

        const newBtnGP = document.createElement("div");
        newBtnGP.className = "btn-group";

        const newSumitBtn = document.createElement("button");
        newSumitBtn.className = "btn btn-submit";
        newSumitBtn.setAttribute("onclick","formSubmitFun()");
        newSumitBtn.innerText = "Submit";

        newBtnGP.appendChild(newSumitBtn);

        resultCon.append(newH1Tag,newULTag,newBtnGP);

        return;
    }

    // to active new page
    dots[formIdx].classList.add("actived");
    pages[formIdx].style.display = "block";

    // for btn-prev
    if(formIdx < 1){
        btnPrev.style.display = "none";
    }else{
        btnPrev.style.display = "block";
    }
}
toChangePage(formIdx);

// end to change page

// start for form-control

for(let input of formControls){
    input.addEventListener("focusin",()=>{
        // console.log("in")
        input.parentElement.className += " focused";

        // toMakePass(input);
        // console.log(toPass);
    });

    input.addEventListener("focusout",()=>{
        // console.log("out");
        input.parentElement.className = input.parentElement.className.replace(" focused","");

        toMakePass(input)
        // console.log(toPass);
    });
}

// end for form-control

// start for btns

btnNext.addEventListener("click", () => toChangePage("next"));
btnPrev.addEventListener("click", () => toChangePage("prev"));

// end for btns

// start for formSubmitFun

function formSubmitFun() {
    regForm.submit();
};

// end for formSubmitFun