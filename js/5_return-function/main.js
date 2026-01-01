// // return function
// function createrFunc() {
//     return function() {
//         console.log('I am a function returned by another function');
//     }
// }

// const x = createrFunc(); // returns a function

// x(); // calling the returned function




    // function createFunc(x , y) {
    //     return ("this is your Sum of two numbers: "+ x + " and " + y + " = " + (x + y));
    // }

    // console.log(createFunc(4, 4));



    // function createFunc(x, y) {
    //     console.log(x + " and " + y + " = " + (x + y));
    // }
    
    // createFunc(4,0);



    function createFunc(x , y) {
        console.log("this is your Sum of two numbers: " + x + " and " + y + " = " + (x + y)); 
    }

    return createFunc(4,6);