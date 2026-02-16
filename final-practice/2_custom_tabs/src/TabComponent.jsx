import React from 'react'
import Tab_menues from './Tab-menues'

import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'

function RandomContent(){

    return <h1>This is Contact us Section</h1>
}


const TabComponent = () => {

    const tabs = [
        {
            label : 'Home',
            content : <div>This is the Home Section</div>,
            

        },
        {
            label : 'About Us',
            content : <h1>This is the About Us Section</h1>,
            
        },
        {
            label : 'Gallery',
            img : [img1,img2,img3]

        },
        {
            label : 'Services',
            content : <p>This is the Services Section</p>
        },
        {
            label : 'Contact Us',
            content : <RandomContent /> // render a React component, start its name with an uppercase letter.
        }
    ]



  return <>
        <Tab_menues  data={tabs}/>
  </>

}


export default TabComponent;
