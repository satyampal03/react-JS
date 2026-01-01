console.log(a); // let-const.js:1 Uncaught ReferenceError: Cannot access 'a' before initialization
let a = 10;

console.log(b); // let-const.js:1 Uncaught ReferenceError: Cannot access 'a' before initialization
const b = 20;

console.log(c); // undefined
var c = 30;


let s = 40;
console.log(s);

// but let variable can not be Re-Initlize again, it can be 
