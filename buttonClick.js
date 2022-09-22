let wB = document.querySelector(".wB");
let sB = document.querySelector(".sB");
let eB = document.querySelector(".eB");
let bsf = document.querySelector(".bsf");
let aStar = document.querySelector(".aStar");
let dsf = document.querySelector(".dsf");
let krusk = document.querySelector(".kruskal");
// on click event for wall button
wB.addEventListener("click", (event) => {
    wB.classList.add("wallBtn");
    sB.classList.remove("startBtn");
    eB.classList.remove("endBtn");
})
// on click event for start button
sB.addEventListener("click", (event) => {
    wB.classList.remove("wallBtn");
    sB.classList.add("startBtn");
    eB.classList.remove("endBtn");
})
// on click event for end button
eB.addEventListener("click", (event) => {
    wB.classList.remove("wallBtn");
    sB.classList.remove("startBtn");
    eB.classList.add("endBtn");
})
bsf.addEventListener("click", (event) =>{
    bsf.classList.add("sMethod");    
})
aStar.addEventListener("click", (event) =>{
    aStar.classList.add("sMethod");    
})
dsf.addEventListener("click", (event) =>{
    dsf.classList.add("sMethod");    
})
krusk.addEventListener("click", (event) =>{
    krusk.classList.add("sMethod");    
})
// start with wall button selected
document.addEventListener("load", wB.classList.add("wallBtn"))