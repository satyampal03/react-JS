import { useState} from "react";

function Footer(){

    return(
        <>  
           <footer className="footer">
  <div className="footer-container">

    <div className="footer-column">
      <h3>Dummy Heading</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, at.</p>
    </div>

    <div className="footer-column">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h4>Contact</h4>
      <p>Lorem ipsum dolor sit.</p>
      <p>Email: xyz@gmail.com</p>
      <p>Phone: +971 000 0000</p>
    </div>

    <div className="footer-column">
      <h4>Follow Us</h4>
      <div className="social-links">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>

  </div>

  <div className="footer-bottom">
    <p>Made with Love ❤️</p>
  </div>
</footer>
        </>
    )
}

export default Footer;