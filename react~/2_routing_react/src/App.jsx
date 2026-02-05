import React from "react"
import {Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Product from "./pages/Product"
import Contact from "./pages/Contect"

function App() {

  return (
    <>
      <h1 
      className="bg-amber-300 text-red-400 flex align-middle justify-center h-{40px}">
        This is the Project Heading
      </h1>

      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  )
}

export default App