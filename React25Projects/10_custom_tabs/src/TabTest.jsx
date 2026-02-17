import React from 'react'
import { Tabs } from './Tabs'

function RandomContent (){
    return <h1>This is the Contact US Section that Comming From the another content page </h1>
}


export const TabTest = () => {

    const tabs = [
        {
            label : 'Home',
            content : <div>This is the Home Section</div>
        },
        {
            label : 'About Us',
            content : <div>This is the About Us Section</div>
        },
        {
            label : 'Services',
            content : <div>This is the Services Section</div>
        },
        {
            label : 'Contact Us',
            content : <RandomContent /> // render a React component, start its name with an uppercase letter.
        }
    ]


    function handleChange (currentTabIndex){
        console.log(currentTabIndex);
    }

  return <>
  <Tabs tabsContent={tabs} onChange={handleChange}/>
  </>
}

