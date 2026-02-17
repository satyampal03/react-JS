import React, { useState } from 'react'

export const Tabs = ({tabsContent,onChange}) => {



  console.log('====>>>>',tabsContent);
  


  const [currentTabIndex, setCurrentTabIndex] = useState(null);

function handleOnClick(getCurrentIndex){
  setCurrentTabIndex(getCurrentIndex)
  // onChange(getCurrentIndex);
}

  return (
    <div className="wrapper menu">
      <div className='heading'>
          {
            tabsContent.map((tabItem, index )=> (
            <div onClick={()=>handleOnClick(index)} key={tabItem.label} className={currentTabIndex === index ? "tab active" : "tab"}>
              <span className='label'>{tabItem.label}</span>
            </div>
          ))}
      </div>
      <div className="content">
            {
              tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content
            }
      </div>
    </div>
  )
}
