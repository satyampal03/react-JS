import React from 'react'
import TreeView from './TreeView'
import { data } from './data'

export const App = () => {

  let menus = data;
  return (
    <div className='tree_view_container'>
      <TreeView list={menus}/>
    </div>
  )
  
}

export default App