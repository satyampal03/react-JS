import React from 'react'
import { useState } from 'react';
import data from './data';

export const Single_selection = () => {
    const [selected, setSelected] = useState(null)

  function handleSingleSelection(currentId){
    console.log(currentId);

    setSelected(currentId === selected ? null:currentId);
  }


  return (
    <div className='wrapper'>
        <div className='accordion'>
          {
            data && data.length > 0 ? 
              data.map((dataItem ) => <div className='item'>
                  <div className='title' onClick={()=> handleSingleSelection(dataItem.id)}>
                    <h3>{dataItem.question}</h3>
                    <span>+</span>
                  </div>
                  <div>
                      {
                       selected === dataItem.id
                       ?
                       <div className='content'>{dataItem.answer}</div>
                       :null
                      }
                  </div>
              </div>) 
              :
              (
              <div>Data Not Found</div>
          )}
        </div>
    </div>
  )
}

export default Single_selection
