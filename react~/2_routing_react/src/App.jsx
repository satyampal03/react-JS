import React from "react"
import {Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Product from "./pages/Product"
import Contact from "./pages/Contect"
import Header from "../public/componenets/Header"

function App() {

  return (
    <>

      <Header />
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