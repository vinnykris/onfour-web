import React from "react";
import logo from "../images/onfour_logo.png";
import "../styles.scss";

const NavBar = () => {
  return (
    <nav className="navbar">
      <img className="onfour-logo" src={logo} width="auto" alt="nav-logo"></img>
      <div className="nav-pages">
        <a className="nav-page">Home</a>
        <a className="nav-page">What is Onfour</a>
        <a className="nav-page">Musician</a>
        <a className="nav-page">Host</a>
        <a className="login-button">Log in</a>
      </div>
    </nav>
  );
};

export default NavBar;
