import { useState } from "react";

function Body(props){

    const [name, setName] = useState('ramesh');
    return(
        <>

        <p>This is Body Of {props.name}</p>
        <h1>This is the Body</h1>

        </>
    )
}

export default Body;