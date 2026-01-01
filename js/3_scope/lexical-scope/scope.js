function mainfunc()  {
    var  user1 = "This is user 1st"; // this is function scope variable..
    function innerfunc(){
        var user2 = "This is 2nd user ";
        
        console.log(user1); // This is user 1st (accessible) here, we have the permission to access the outer function variable
        console.log(user2); // This is 2nd user (accessible) here, we have fully permission to access the inner function variable
    }
    innerfunc(); // calling the inner function here to execute here

    console.log(user1); // this is the funtion scope variable, so it is accessible here

    console.log(user2); // this is the inner function =(laxical scopt ) so that is not allow to access the inner function here.
}

mainfunc(); // calling the main function to execute the code

console.log(user1); // this is the function scope variable that is not accessible
console.log(user2); // allso this is not accessible becose this is the lexical scope variable 