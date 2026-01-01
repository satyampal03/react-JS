// function demo() {
//   var b = 20; // local
//   console.log(b); // 20 this is the local variable it will print here the declared value 
// }
// demo();
// console.log(b); // ❌ ReferenceError: b is not defined   because we are trying to access a local variable outside its scope

// function demo() {





//   var x = 10; // function scope

//   if (true) {

//     var y = 20; // still function-scoped!

//     console.log( "1st "+ x, y); // 10 20


//   }

//   console.log("2nd console " + x, y); // 10 20 → y is accessible here

// }
// demo();

// console.log(y); // ❌ ReferenceError → outside function




function demo() {
  var y = 20;
  console.log(y); // ✅ 20
}
demo();
console.log(y); // ❌ ReferenceError
