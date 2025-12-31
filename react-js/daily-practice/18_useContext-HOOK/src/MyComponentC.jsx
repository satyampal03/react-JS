import React, {useState,useContext} from "react";
import { UserContext } from "./MyComponentA"; "react";


import MyComponentD from "./MyComponentD"

function MyComponentC(props){
    const compoAwalaUser = useContext(UserContext);
    return (<>
    <div className="container">
        <h1>ComponentC</h1>

        <p>A wala user : {compoAwalaUser}</p>
           <MyComponentD/>
    </div>
    </>)
}

export default MyComponentC
