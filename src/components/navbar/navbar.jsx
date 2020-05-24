// React imports
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Component imports
import { Grid, Row, Col } from "../grid";

// Image imports
import new_logo_white from "../../images/logos/new_logo_white.png";

// Styles imports
import "./navbar_styles.scss";

// Navbar component
const NavBar = () => {
  let navbar_custom = "navbar-black"; // Default navbar SASS class
  let style = "nav-page-white"; // Default navbar color style
  let icon = new_logo_white; // Default navbar icon
  let location = useLocation(); // Get location of user navigation

  // Change styles if on about page
  if (location.pathname === "/") {
    navbar_custom = "navbar-custom";
  }

  // Open menu function for mobile
  const openMenu = () => {
    document.getElementById("nav-menu").style.height = "100%";
  };

  // Close menu function for mobile
  const closeMenu = () => {
    document.getElementById("nav-menu").style.height = "0%";
  };

  // Close menu after user navigates to new page
  useEffect(() => {
    closeMenu();
  }, []);

  return (
    <div className={navbar_custom}>
      {/* MOBILE VERSION */}
      <div id="nav-menu" className="overlay-menu">
        <Grid>
          <Row>
            <Col size={1}>
              <span className="navbar-close" onClick={closeMenu}>
                <i className="fa fa-times fa-2x close-icon"></i>
              </span>
            </Col>
          </Row>
          <div className="overlay-content">
            <div className="mobile-nav-link">
              <Row>
                <Col size={1}>
                  <NavLink
                    exact
                    to="/"
                    className="nav-page-white mobile-link-text"
                    onClick={closeMenu}
                  >
                    ABOUT US
                  </NavLink>
                </Col>
              </Row>
            </div>
            <div className="mobile-nav-link">
              <Row>
                <Col size={1}>
                  <NavLink
                    to="/stream"
                    className="nav-page-white mobile-link-text"
                    onClick={closeMenu}
                  >
                    STREAM
                  </NavLink>
                </Col>
              </Row>
            </div>
            <div className="mobile-nav-link">
              <Row>
                <Col size={1}>
                  <NavLink
                    to="/upcoming"
                    className="nav-page-white mobile-link-text"
                    onClick={closeMenu}
                  >
                    UPCOMING
                  </NavLink>
                </Col>
              </Row>
            </div>
            <div className="mobile-nav-link">
              <Row>
                <Col size={1}>
                  <NavLink
                    to="/archive"
                    className="nav-page-white mobile-link-text"
                    onClick={closeMenu}
                  >
                    PAST SHOWS
                  </NavLink>
                </Col>
              </Row>
            </div>
          </div>
        </Grid>
      </div>
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
              src={new_logo_white}
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
          <Col size={0.4}></Col>
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

          <Col size={0.4}>
            <NavLink
              to=""
              className={style}
              data-toggle="modal"
              data-target="#sign_in_Modal"
            >
              <span className="user-menu">
                <i className="fa fa-user-o fa-2x user-icon"></i>
              </span>
            </NavLink>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default NavBar;
