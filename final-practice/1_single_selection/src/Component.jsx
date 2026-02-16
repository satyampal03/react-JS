import React from 'react'
import { useState } from 'react';


 const Component = ({list}) => {
   const [selected, setSelected] = useState(null)

function handleSelectedItem(itemClicked){
        // console.log(itemClicked);

      console.log(selected);

      setSelected(itemClicked === selected ? null : itemClicked);  
}

  return (
        <div className="container">
            {
              list && list.length > 0 ?
              list.map((dataItem, index)=> <div className="item">
                    <div className="title" onClick={()=>handleSelectedItem(dataItem.id)}>
                        <h3>{dataItem.question}</h3>
                    </div>

                    <div className="view_answer">
                        {
                            selected === dataItem.id?
                             <div className="answer">{dataItem.answer}</div> : null                           }
                    </div>
              </div> )
              :  <div className='data_not_fount_animation'>Data Not Found</div>
            }
        </div>
  ) 
}


export default Component;