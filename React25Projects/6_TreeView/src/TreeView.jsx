import React from 'react'
import MenuItem from './Menu-item';

const TreeView = ({list = []}) => {
  return (
    <ul className ='menu_list_container'>
        {
          list && list.length ?
          list.map(listItem =><MenuItem item={listItem}/>) : null
        }
    </ul>
  )
}


export default TreeView;