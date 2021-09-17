import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <nav className="footer-container">
      <a
        href="https://www.linkedin.com/in/david-mejia-349ba4154/"
        className="linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* LinkedIn */}
      </a>
      <a
        href="https://github.com/David7Mejia/Nomadika"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* GitHub */}
      </a>
      {/* <a href="https://angel.co/u/david-mejia-12">AngelList</a> */}
    </nav>
  );
};

export default Footer;
