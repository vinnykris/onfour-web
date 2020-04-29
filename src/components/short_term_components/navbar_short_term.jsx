import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/whitelogo.png";
import blacklogo from "../../images/blacklogo.png";
import "../../styles.scss";
import { Col } from "../grid";

const NavBarShortTerm = () => {
  let style = "nav-page-black";
  let icon = blacklogo;
  let location = useLocation();
  if (location.pathname === "/") {
    style = "nav-page-white";
    icon = logo;
  }

  if (location.pathname === "/ticket") {
    style = "nav-page-black";
    icon = blacklogo;
  }

  return (
    <div className="navbar">
      <img className="onfour-logo" src={icon} width="auto" alt="nav-logo"></img>
      <div>
        <NavLink to="/ticket" className={style}>
          TICKET
        </NavLink>
        <NavLink to="/archive" className={style}>
          PAST SHOWS
        </NavLink>
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
