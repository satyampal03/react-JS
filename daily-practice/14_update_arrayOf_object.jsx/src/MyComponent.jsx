import React, { useState } from "react";

function MyComponent() {
  const [cars, setCars] = useState([]);
  const [carYear, setCarYear] = useState(new Date().getFullYear());
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');

  function addCar() {
    const newCar = {
        year : carYear,
        make : carMake,
        model : carModel,
    }
     setCars(c => [...c, newCar]);

     setCarYear(new Date().getFullYear());
     setCarMake('');
     setCarModel('');
  }

  function removeCar(index) {
       setCars(c=>c.filter((_,i)=> i !==index));
  }

  function yearChange(event) {
    setCarYear(event.target.value);
  }

  function makeCar(event) {
    setCarMake(event.target.value);

  }
  function modelCar(event) {
    setCarModel(event.target.value);

  }

  return (
    <>
      <div>
        <h2>List of Car Object</h2>
        <ul>
            {
                cars.map((item,index)=> {
                    return <li key={index} onClick={() =>removeCar(index)}>{item.year} {item.model} {item.make}</li>
                }) 
            }
        </ul>
         <pre>
            Year :
        <input type="number" value={carYear} onChange={yearChange} /> <br />

            Make :
        <input type="text" value={carMake} onChange={makeCar} /><br />

            Model :
        <input type="text" value={carModel} onChange={modelCar} /><br />
         </pre>

        <button onClick={addCar}>Add Car</button>
      </div>
    </>
  );
}

export default MyComponent;
