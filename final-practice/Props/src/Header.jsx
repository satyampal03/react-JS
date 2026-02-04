import { useState } from "react";

function Header(props) {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="#">LOGO</a>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="menu-toggle" onclick="toggleMenu()">
          ☰
        </div>
      </nav>
    </>
  );
}

// Header.propTypes = {
//   status: PropTypes.oneOf(["loading", "success", "error"]) // Value can be from there values

// };

import PropTypes from "prop-Types";

// Header.defaultProps = {
//   name: "Guest"
// };

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
