import React, {useState} from "react"; // React library imported here


function Counter(){


    const [counter, setCounter] = useState(0)

    const increase = ()=>{
        setCounter(counter + 1);
    } 

    const reset = ()=>{
        setCounter(0);
    } 

       const decresse = ()=>{
        setCounter(counter-1 );
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