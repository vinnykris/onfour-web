import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/onfour_logo.png";
import "../styles.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <img className="onfour-logo" src={logo} width="auto" alt="nav-logo"></img>
      <div className="nav-pages">
        <NavLink
          exact
          to="/"
          className="nav-page"
          activeStyle={{
            fontWeight: "bold",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/whatisonfour"
          className="nav-page"
          activeStyle={{
            fontWeight: "bold",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          What is Onfour
        </NavLink>
        <NavLink
          to="/musicians"
          className="nav-page"
          activeStyle={{
            fontWeight: "bold",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          Musicians
        </NavLink>
        <NavLink
          to="/hosts"
          className="nav-page"
          activeStyle={{
            fontWeight: "bold",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          Hosts
        </NavLink>
        <NavLink
          to="/login"
          className="nav-page"
          activeStyle={{
            fontWeight: "bold",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          Log in
        </NavLink>
        {/* <a className="nav-page">Home</a>
        <a className="nav-page">What is Onfour</a>
        <a className="nav-page">Musician</a>
        <a className="nav-page">Host</a>
        <a className="login-button">Log in</a> */}
      </div>
    </div>
  );
};

export default NavBar;
