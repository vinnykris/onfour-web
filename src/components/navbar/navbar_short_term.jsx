import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import new_logo_black from "../../images/logos/new_logo_black.png";
import new_logo_white from "../../images/logos/new_logo_white.png";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";
import closeIcon from "../../images/close_icon.png";
import { useEffect } from "react";

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
    document.getElementById("nav-menu").style.height = "100%";
  };

  const closeMenu = () => {
    document.getElementById("nav-menu").style.height = "0%";
  };

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
              <img
                className="navbar-close"
                onClick={closeMenu}
                src={closeIcon}
              ></img>
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
