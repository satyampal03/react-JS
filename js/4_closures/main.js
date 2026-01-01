// function outer() {
//   console.log("it's me!");
//   const a = 42; // local variable
//   function inner() {
//     console.log("a =", a); // ✅ can access outer's variable
//     console.log("Hello from inner!");
//   };

//   function inner2() {
//     console.log("Hello from inner2!");
//   }
//   inner(); // ✅ calls inner immediately
//   return {inner, inner2, a}; // ✅ returns inner function
// }

// const {inner, inner2: innernew2, a: b} = outer(); // ✅ outer runs, returns inner function
// console.log("a ki b ki form me value=", b); // ✅ can access outer's variable
// inner();    
// innernew2();           // ✅ calls inner → prints message



function Car() {
    const name = "Tesla"; // private variable
    function engine() {
        console.log("Engine started for", name);


        function sound() {
            console.log("Vroom Vroom! The engine is running for", name);
            return 
        
        }
        return sound;


    }
    return engine
}


const x = Car(); // create a new car instance and return the engine function
const y = x; // not executing the entire function yet, just referencing it
const z = y; // execute the engine function, which returns another function
const a = z;
a();
z();
a();
whatIsThis = y();
nowWhatisThis = whatIsThis; 
nowWhatisThis();
whatIsThis();


 // call the returned function to simulate the engine running