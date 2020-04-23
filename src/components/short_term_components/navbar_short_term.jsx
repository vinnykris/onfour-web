import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/whitelogoicon.png";
import blacklogo from "../../images/blacklogoicon.png";
import "../../styles.scss";

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
          Stream
        </NavLink>

        <NavLink exact to="/" className={style}>
          What is Onfour?
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarShortTerm;
