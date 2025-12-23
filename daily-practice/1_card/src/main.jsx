// this file already containing the other components to build the main application 
// this is the main folder that why this is containing all the needed components 
//  such as -- we including here --- css file , app.jscx (that contains the all minor components), and the other thing is that this also contains the all the dependencies that we have need to utilise in this application
// overall this is the main project file.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
