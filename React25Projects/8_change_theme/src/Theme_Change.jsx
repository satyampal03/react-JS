import React from 'react'
import uselocalStorage from './useLocalStorage'

export const Theme_Change = () => {


    const [theme, setTheme] = uselocalStorage('theme', 'dark') // dark is the default theme

    function toggleTheme(){
        setTheme(theme === 'light' ? 'dark': 'light');
    }

    // console.log(localStorage);
   

  return <>
{/* Included Hook */}
    <div className={`light-dark-mode ${theme}`}>
  <div className="container">
    <p>Hello World !</p>
    <button onClick={toggleTheme}>Change Theme</button>
  </div>
</div>


  </>
}