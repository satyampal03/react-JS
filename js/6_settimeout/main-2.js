var a = 2;   // this is a global variable

function mainfunc() {
    var b = 3; // this is a local variable
    
    setTimeout(function() {
        console.log(a); // Accessing global variable ----3
        console.log(b); // Accessing local variable ---4
    }, 1000);

    }  
    mainfunc(); // Call the function to execute the code

    console.log(a); // Accessing global variable   ----1
    console.log(b); // This will throw an error because 'b' is not defined in this scope  ---2 ERROR


