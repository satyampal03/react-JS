// change carg title color

// let idElement = document.getElementById("changebg");

// idElement.style.backgroundColor = "green";


// console.log(document.querySelectorAll(".card-footer"));


// querySelectorAll ---> this will select the index of selector and then apply app style on that
let xdoc = document.querySelectorAll(".card-footer")
console.log(xdoc);
xdoc[0].style.backgroundColor = "red"
xdoc[1].style.backgroundColor = "green"
xdoc[2].style.backgroundColor = "red"


let xfornew = document.querySelectorAll(".card-title")
console.log(xfornew);

xfornew[0].style.backgroundColor = "lightblue";
xfornew[0].style.border = "0.5px solid black";

// querySelector  --> this use to find the 1st class of any element - and apply on it that style

let newStyle = document.querySelector(".text-body-secondary");

newStyle.style.backgroundColor = "aqua";  // querySelector works only for first scc selector -

console.log(newStyle);


// getelement by TagName --

console.log(document.querySelectorAll("div"));



// let final = bytagSelector.getElementsByTagName("div");

// console.log(final.style.backgroundColor= "red");

// console.log(final);