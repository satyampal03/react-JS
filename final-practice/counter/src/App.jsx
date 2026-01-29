import { useState } from "react";

function App(){

   const [counter, setCounter] = useState(0);
   
  function increase(){
    setCounter(counter+1)
  }

  function decrease(){
    setCounter(counter-1)
  }

  return (
    
    <>
      <h1>{counter}</h1>
      <button onClick={increase} >Increament</button>
      <button onClick={decrease}>Decreament</button>
    </>
  )
}

export default App;