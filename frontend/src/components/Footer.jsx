import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} FastPay. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
