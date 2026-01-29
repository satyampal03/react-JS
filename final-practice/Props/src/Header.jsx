import { useState } from "react";


function Header(props){

    return(
    <>
        <p>this is the  Header of {props.name}</p>
         <h1>This is the Header</h1>
    </>
    )
};

// Header.propTypes = {
//   status: PropTypes.oneOf(["loading", "success", "error"]) // Value can be from there values

// };

import PropTypes from "prop-Types";

// Header.defaultProps = {
//   name: "Guest"
// };

Header.propTypes = {
  name: PropTypes.string
};

export default Header;