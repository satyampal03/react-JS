import React from 'react'

import { useState } from 'react';

 const Tab_menues = ({data}) => {
    const [selected, setSelected] = useState(0)

    function menuClickHandler(clickedItem){
        // setSelected(clickedItem === selected ? null : clickedItem);

        setSelected(clickedItem);

    }
    
    console.log(selected);
    
    
  return <>
        <div className="container">
           {
    data.map((dataItem, index) => {
        // You must add 'return' here!
        return (
            <div className="menuItems" key={index} onClick={() => menuClickHandler(index)}>
                {dataItem.label} 
            </div>
        );
    })
}
                <div className="componet_section">
                    {
                     data.content ?
                      data[selected] && data[selected].content :
                      <div className="imageSection">{data[selected] && data[selected].img.map((imageItem, index)=>{
                        return imageItem
                     })} </div>
                        
                    }
                     
                </div>
        </div>
  </>
}

export default Tab_menues;