import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/onfour_logo.png";
import "../../styles.scss";

const NavBarShortTerm = () => {
  return (
    <div className="navbar">
      <img className="onfour-logo" src={logo} width="auto" alt="nav-logo"></img>
      <div>
        <NavLink
          to="/stream"
          className="nav-page"
          //   activeStyle={{
          //     //   fontWeight: "bold",
          //     //   color: "black",
          //     textDecoration: "none",
          //   }}
        >
          Stream
        </NavLink>

        <NavLink
          exact
          to="/"
          className="nav-page"
          // // activeStyle={{
          // //   fontWeight: "bold",
          // //   color: "black",
          // //   // textDecoration: "underline",
          // }}
        >
          What is Onfour?
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarShortTerm;
