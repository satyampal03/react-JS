import React, {useEffect, useState, useRef} from "react";

function MyComponent(){

    const inputRef = useRef('Mohit');
    const inputRef1 = useRef('Ramesh');

    useEffect (() => {
           console.log("COMPONENT RENDERED");
    });

    function handleClick(){
        // inputRef.current = inputRef.current + 1;
        // console.log(inputRef.current);
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = 'gray';
        inputRef1.current.style.backgroundColor = '';
    }
    
    function handleClick1(){
        // inputRef.current = inputRef.current + 1;
        // console.log(inputRef.current);
        inputRef1.current.focus();
        inputRef1.current.style.backgroundColor = 'gray';
        inputRef.current.style.backgroundColor = '';
    }

    return (
        <>
        <button onClick={handleClick}>
            Click me!
        </button>
        <input ref={inputRef}/>

        <button onClick={handleClick1}>
            Click me!
        </button>
        <input ref={inputRef1}/>
        </>
    );
}

/*
function MyComponent(){

    const [value,setValue] = useState(0);

    function increase(){
        setValue(value =>(value + 1));
    }

    useEffect(()=> {
           console.log('Value Updating');
    })

    return (<>
     <h2>{value}</h2>
        <button onClick={increase}>Increase Me</button>
    </>)
}   
*/
export default MyComponent