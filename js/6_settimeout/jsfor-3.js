function a() {
    for ( var i = 0;   // variable i is declared with var, so it is function-scoped
         i <= 5;      // i should be lest than or equal to 5
          i++  ) // increament here 0 - 5 
        {
        setTimeout(function() {    // setTimeout function is initialized

    console.log(i); // Accessing intire variable ----1

        }, 3000);         // 1 second delay to execute the function

    console.log(i); // Accessing intire variable ----1
    }
 
}

a(); // Call the function to execute the code





/// --- ? DO AGIAN TO UNDERSTAND MORE DEEPEST