import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/white_logo.png";
import black_logo from "../../images/black_logo.png";
import "../../styles.scss";

const NavBarShortTerm = () => {
  let style = "nav-page-black";
  let icon = black_logo;
  let location = useLocation();
  if (location.pathname === "/") {
    style = "nav-page-white";
    icon = logo;
  }


  return (
    <div className="navbar">
      <img className="onfour-logo" src={icon} width="auto" alt="nav-logo"></img>
      <div>
        <NavLink to="/archive" className={style}>
          PAST SHOWS
        </NavLink>
        <NavLink to="/ticket" className={style}>
          UPCOMING
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
