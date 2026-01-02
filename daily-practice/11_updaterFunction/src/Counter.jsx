// updater function = A function passed as an argument to setState() usually
//ex. setYear(arrow funciton)
//Allow for safe updates based on the previous state Used with multiple state updates and asynchronous functions
//Good practice to use updater functions

import React, {useState} from "react"; // React library imported here


function Counter(){


    const [counter, setCounter] = useState(0)

    const increase = ()=>{

    // Takes the CURRENT state to calculate NEXT state.
    // React puts your updater function in a queue (waiting in line)
    // During the next render, it will call them in the same order.

       /* setCounter(counter + 1);
        setCounter(counter + 1);
        setCounter(counter + 1);
        setCounter(counter + 1); */ 

     // as we increasing the counter value it updeting 1-1-1 not directly 3 at one time so this is because of it reflecting at once and [counter initially setted is 0]

     // so there we will use the 

     setCounter(counter => counter + 2) // use upfater function to be help future Proof your code
    } 

    const reset = ()=>{
        setCounter(counter => counter = 0);
    } 

       const decresse = ()=>{
        setCounter(counter => counter - 1 );
    } 


    return (
        <>

        <h1>Counter Application</h1>
        <div className="container">
            <h1 className="counter">{counter}</h1>

            <div className="btn-container">
                <button className="increase btn" onClick={increase}>Increase </button>
                <button className="reset btn" onClick={reset}>Reset</button>
                <button className="decrease btn" onClick={decresse}>Decrease</button>
            </div>
        </div>

        </>
    )
}

export default Counter