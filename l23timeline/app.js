var getboxes = document.querySelectorAll(".boxes");
// console.log(getboxes);

for(var x = 0; x < getboxes.length; x++){
    getboxes[x].addEventListener("mouseenter", function(){
        // console.log(this);

        if(this.classList.contains("left")){
            this.classList.remove("left");
            this.classList.add("right");
        }else{
            this.classList.remove("right");
            this.classList.toggle("left");
        }
    });
};