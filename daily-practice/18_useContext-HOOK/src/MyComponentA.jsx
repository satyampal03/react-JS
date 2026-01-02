import React, { createContext , useState } from 'react';
// import React, {useState} from 'react';
import MyComponentB from './MyComponentB';
// import React, {useState, createContext} from 'react';

// import MyComponentB from "./MyComponentB";
// import MyComponentC from "./MyComponentC"
// import MyComponentD from "./MyComponentD"

export const UserContext = createContext();

function MyComponentA(){
    
    const [user, setUser] = useState('Saim Deo');
    return (<>
    <div className="container">
        <h1>ComponentA</h1>
        <p>${user}</p>
        <UserContext.Provider value={user}>
            <MyComponentB  x={user}/>
        </UserContext.Provider>
    </div>
    </>)
}

export default MyComponentA
