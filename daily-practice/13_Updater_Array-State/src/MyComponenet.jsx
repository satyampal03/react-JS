import React, {useState} from 'react';

function MyComponent(){
    
    const [food, setFood] = useState(['Apple', 'Banana', 'Orange', 'Grapes']);

    function addFood(e){
        const newItem = document.getElementById('foodInput').value;
        document.getElementById('foodInput').value = '';

        setFood(f => [...f, newItem]);
    }

    function removeFood(index){
        setFood(food.filter((_,i) =>{
          return  i !== index
        }))
    }

    return (
    //     <>
    //    <h1>List of  Food</h1>
    //     <ul>
    //         {food.map((value, index) => <li key={index}>{value}</li>)}
    //     </ul>
    //     </> 

        <>
        <h1>List of  Food</h1>
        <ul>
            {food.map((value, index)=> {
              return    <li key={index} onClick={() => removeFood(index)}>
                            {value}
                        </li> // keep in mind Block body wants to return without returning it will not work
            })}
        </ul>
        <input type="text" id='foodInput' placeholder='Enter New Item ' />
        <button onClick={addFood}>Add Item</button>
        </>
    )
}

export default MyComponent