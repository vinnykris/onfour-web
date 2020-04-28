import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/whitelogo.png";
import blacklogo from "../../images/blacklogo.png";
import "../../styles.scss";
import { Col } from "../grid";

const NavBarShortTerm = () => {
  let style = "nav-page-white";
  let icon = logo;
  let location = useLocation();
  if (location.pathname === "/stream") {
    style = "nav-page-black";
    icon = blacklogo;
  }

  return (
    <div className="navbar">
      <img className="onfour-logo" src={icon} width="auto" alt="nav-logo"></img>
      <div>
        <NavLink to="/stream" className={style}>
          STREAM
        </NavLink>
        <NavLink exact to="/" className={style}>
          ABOUT US
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarShortTerm;
