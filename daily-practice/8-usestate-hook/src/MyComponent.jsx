// we are using the hook function based conponents

import React, {useState} from "react"
function MyComponent (){

    const [name, setName] = useState('Default');
    const [age, setAge] = useState(4);
    const [isEmploye, setIsEmployed] = useState(false);

    const updateName = ()=>{
        setName('myNewName#')
    }

    const updateAge = ()=> {
        setAge(age+1);
    }

    const employeStatus = ()=> {
        setIsEmployed(!isEmploye);
    }   
    
    return(

        <>
         <h1>useStae Hooks</h1>

        <p>Name : {name}</p>
        <button onClick={updateName}>Change Name</button>

        <p>Age : {age}</p>
        <button onClick={updateAge}>Update Age</button>


        <p>Is Employed : {isEmploye? 'Yes':'No'}</p>
        <button onClick={employeStatus}>Employe Status</button>
        </>
    )
}

export default MyComponent