import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logos/onfour_logo.png";
import "./navbar_styles.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <NavLink
          exact
          to="/"
          className="nav-home"
          // // activeStyle={{
          // //   fontWeight: "bold",
          // //   color: "black",
          // //   // textDecoration: "underline",
          // }}
        >
          <img
            className="onfour-logo"
            src={logo}
            width="auto"
            alt="nav-logo"
          ></img>
        </NavLink>
        {/* </div>
      <div> */}
        <NavLink
          to="/login"
          className="nav-page"
          activeStyle={{
            //   fontWeight: "bold",
            //   color: "black",
            textDecoration: "none",
          }}
        >
          Log in
        </NavLink>

        <NavLink
          to="/hosts"
          className="nav-page"
          // activeStyle={{
          //   fontWeight: "regular",
          //   color: "black",
          //   // textDecoration: "underline",
          // }}
        >
          Hosts
        </NavLink>

        <NavLink
          to="/musicians"
          className="nav-page"
          // activeStyle={{
          //   fontWeight: "bold",
          //   color: "black",
          //   // textDecoration: "underline",
          // }}
        >
          Musicians
        </NavLink>

        <NavLink
          to="/whatisonfour"
          className="nav-page"
          // activeStyle={{
          //   fontWeight: "bold",
          //   color: "black",
          //   // textDecoration: "underline",
          // }}
        >
          What is Onfour
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
