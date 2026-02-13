import React from 'react'
import TreeView from './TreeView'
import { useState } from 'react';

const MenuItem = ({item}) => {


  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  function handleToggleChildren(getCurrentLabel){
    setDisplayCurrentChildren({...displayCurrentChildren,
      [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel] })
  }


console.log('============>',displayCurrentChildren);

  return (
    <li className='list_item'>
      <div className='list_name'>
        <p  >{item.label}</p>
        {
          item && item.children && item.children.length ? <span onClick={()=>handleToggleChildren(item.label)}>{
            displayCurrentChildren[item.label] ? '-': '+'
          }</span> : null
        }
      </div>

        {
          item && item.children && item.children.length > 0 && displayCurrentChildren[item.label]?
            <TreeView list={item.children}/> 
            :null
        }
    </li>
  )
}

export default MenuItem
