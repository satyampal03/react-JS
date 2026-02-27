import { useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


 function Header() {
  const navigate = useNavigate()

  const { cartItems } = useCart();



  function homeTriggered(){
    navigate(`/`);
  }

  function cartTriggered(){
      navigate(`/cart`)
  }

  function loginTriggered(){
      navigate(`/login`)
}

  return (
    <header className="header flex items-center justify-between p-4 bg-white shadow-md">
      <div onClick={homeTriggered} className="text-3xl font-bold tracking-tighter text-black-500 cursor-pointer" >LOGO</div>

      <SearchBar />


      <div className="actions">

        <button onClick={cartTriggered}>Cart {cartItems.length}</button>
        <button onClick={loginTriggered}>Login</button>

      </div>
    </header>
  );
}

export default Header