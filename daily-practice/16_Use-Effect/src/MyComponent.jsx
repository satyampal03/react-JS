import React, {useState, useEffect} from "react";


/*
useEffect(function, [dependencies])
useEffect(() => {})
// Runs after every re-render
useEffect(() => {}, [])
// Runs only on mount
useEffect(() => {}, [value])
// Runs on mount + when value changes

*/
function MyComponent (){

    const [count, setCount] = useState(0);

    // useEffect(()=>  {
    //     document.title = `count ${count};
    

    // useEffect(()=>{
    //     document.title = `Count : ${count}`
    // })

    useEffect(()=>{
        document.title = `Count : ${count}`
    },[count])

    function addCount(){
        setCount(x => (x, x + 1));
    }


    function subtract (){
        setCount(d => d - 1)
    }
    return (
        <>
        <p>Count : {count}</p>
        <button onClick={addCount}>Add</button>
        <button onClick={subtract}>Decreace</button>
        </>
    )
}

export default MyComponent;