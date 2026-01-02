import React, {useState,useContext} from "react";
import { UserContext } from "./MyComponentA"; "react";

function MyComponentD(props){

    const user = useContext(UserContext);
    return (<>
    <div className="container">
        <h1>ComponentD</h1>
          <p>SuccessFully :{user} </p>
    </div>
    </>)
}
// Component A is the PROVIDER Component
// Component D is the CONSUMER Component

export default MyComponentD