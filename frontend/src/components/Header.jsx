import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <h1>FastPay</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/transactions">Transactions</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
