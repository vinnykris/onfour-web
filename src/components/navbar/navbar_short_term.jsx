import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import new_logo_black from "../../images/logos/new_logo_black.png";
import new_logo_white from "../../images/logos/new_logo_white.png";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";

const NavBarShortTerm = () => {
  let navbar_custom = "navbar-black";
  let style = "nav-page-white";
  let icon = new_logo_white;
  let location = useLocation();
  if (location.pathname === "/") {
    // style = "nav-page-white";
    // icon = new_logo_white;
    console.log("on about page");
    navbar_custom = "navbar-custom";
  }

  const openMenu = () => {
    console.log("clicked hamburger menu");
  };

  const closeMenu = () => {};

  return (
    <div className={navbar_custom}>
      {/* MOBILE VERSION */}
      <div></div>
      <Grid className="mobile-grid">
        <Row className="mobile-row">
          <Col size={1}>
            <span className="hamburger-menu" onClick={openMenu}>
              <i className="fa fa-bars fa-2x hamburger-icon"></i>
            </span>
          </Col>
          <Col size={3}>
            <img
              className="onfour-logo-mobile"
              src={new_logo_black}
              width="auto"
              alt="nav-logo"
            ></img>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>

      {/* DESKTOP VERSION */}
      <Grid className="desktop-grid">
        <Row className="desktop-row">
          <Col size={1}>
            <NavLink to="/archive" className={style}>
              PAST SHOWS
            </NavLink>
          </Col>
          <Col size={1}>
            <NavLink exact to="/" className={style}>
              ABOUT US
            </NavLink>
          </Col>
          <Col size={1}>
            <img
              className="onfour-logo-desktop"
              src={icon}
              width="auto"
              alt="nav-logo"
            ></img>
          </Col>
          <Col size={1}>
            <NavLink to="/stream" className={style}>
              STREAM
            </NavLink>
          </Col>
          <Col size={1}>
            <NavLink to="/upcoming" className={style}>
              UPCOMING
            </NavLink>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default NavBarShortTerm;
