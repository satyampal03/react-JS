import React, {useState} from "react";

function MyComponent (){
     
    const [car, setCar] =  useState({
           year: null,
           make:'',
           model:'',
    });

    function handleYearChange(e){
        setCar(c => ({...c, year : e.target.value}));
    }
    
    function handleMakeChange(e){
        setCar(c =>({...c, make : e.target.value}));

    }

    function handleModelChange(e){
        setCar(c =>({...c, model : e.target.value}));
    }

    return (
        <>
        <p>You'r Favourite Car : Model :{car.model} Year : {car.year} Make: {car.make}</p>
          
          <h2>Choose About Your Car</h2>
          <input type="number" value={car.year} onChange={handleYearChange}/>
          <input type="text" value={car.make} onChange={handleMakeChange}/>
          <input type="text" value={car.model} onChange={handleModelChange}/>
        </>
    )
}

export default MyComponent;