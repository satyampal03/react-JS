var a = 10; // this is global scope 

function test() {
  console.log(a); // 10 (accessible)
}


test();    // yes code will run and print 10  


// function test() {
//   var a = 20; // this is the local veriable inside the function;;
// }
// test();// i will now try to access the local veriable "a", // that is not possible, so it will print undefined;

// console.log(a); // undefined (not accessible outside the function)



