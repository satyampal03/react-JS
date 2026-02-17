import React from 'react'
import { useState } from 'react';
import Model from './Model';

 const Modeltest = () => {
    const [showModelPopup, setShowModelPopup] = useState(false);


    function handleModelPopUp (){
        setShowModelPopup(!showModelPopup);
    }

    function onCloseIcon(){
        setShowModelPopup(false);
    }

  return (
    <div>
        <button onClick={()=>handleModelPopUp()} className='buttonToShowModele_popup'>
            Show Pop_up
        </button>

        {
            showModelPopup && <Model  cut={onCloseIcon}/>
        }
    </div>
  )
}


export default Modeltest;