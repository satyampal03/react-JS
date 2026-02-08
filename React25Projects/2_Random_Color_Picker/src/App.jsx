import React, { useEffect, useState } from 'react'

export const App = () => {

  const [typeOfColor, SetTypeOfColor] = useState('hex')
  const [color, SetColor] = useState('#000000')


  function RandomColorGenrator(length){
    return Math.floor(Math.random()*length)
  }
  function handleCreateRandom_HAX_Color(){
    // #678487 

    const hex = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E'];

    let hexColor = '#';

    for(let i =0; i<6; i++){
      hexColor += hex[RandomColorGenrator(hex.length)];
    }

    SetColor(hexColor)
  }


function handleCreateRandom_RGB_Color(){
      const r = RandomColorGenrator(256);
      const g = RandomColorGenrator(256);
      const b = RandomColorGenrator(256);

      SetColor(`rgb${r}${g}${b}`);
  }

useEffect (()=>{
  if(typeOfColor === 'rgb' ) handleCreateRandom_RGB_Color
  else handleCreateRandom_HAX_Color
},[typeOfColor])

  return (
    <div className='container' style={{
      width : "100vw",
      background : color,
    }}>
      <button onClick={()=>SetTypeOfColor('hex')}>Create HEX Color</button>
      <button onClick={()=>SetTypeOfColor('rgb')}>Create RGB Color</button>
      <button onClick={typeOfColor === 'hex'? handleCreateRandom_HAX_Color : handleCreateRandom_RGB_Color}>Generate Random Color</button>

      <div style={{
        display:'flex',
        justifyContent : 'center',
        alignItems:'center',
        color: '#fff',
        fontSize : '60px',
        marginTop :'50px',
        flexDirection: 'column',
        gap : '20px'
      }}>
        <h3>{typeOfColor === 'rgb'? 'RGB Color': 'HEX Color'}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  )
}


export default App