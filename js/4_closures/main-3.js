 function mainfunction() {
    var x = 10;
    function innerFunction() {
        innerFunction++; // Increment the closure variable

    }
    return innerFunction;

}

 var myFunction = mainfunction();
myFunction(); // This will log 10 to the console    