import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
// import logo from "../../images/onfour_logo.png";
import logo from "../../images/whitelogoicon.png";
import "../../styles.scss";

const NavBarShortTerm = () => {
  return (
    <div className="navbar">
      <img
        className="whitelogoicon"
        src={logo}
        width="auto"
        alt="nav-logo"
      ></img>
      <div>
        <NavLink to="/stream" className="nav-page">
          Stream
        </NavLink>

        <NavLink exact to="/" className="nav-page">
          What is Onfour?
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarShortTerm;
