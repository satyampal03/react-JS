import React from "react";

import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className=" px-10 bg-red-500 text-white flex items-center justify-between h-24 ">
        <h2 className="text-2xl"><a href="/">Logo</a></h2>
         <input type="text"  placeholder="write text" />
        <div className="flex gap-10">
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/product'>Product</Link>
                <Link to='/contact'>Contact</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
