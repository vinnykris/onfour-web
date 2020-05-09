import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logos/white_logo.png";
import black_logo from "../../images/logos/black_logo.png";
import new_logo from "../../images/logos/logo_icon-25.png";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";

const NavBarShortTerm = () => {
  let style = "nav-page-black";
  let icon = black_logo;
  let location = useLocation();
  if (location.pathname === "/") {
    style = "nav-page-white";
    icon = logo;
  }

  return (
    <div className="navbar-custom">
      <Grid className="mobile-grid">
        <Row className="mobile-row">
          <Col size={1}>
            <div className="hamburger-menu">
              <i className="fa fa-bars fa-2x hamburger-icon"></i>
            </div>
          </Col>
          <Col size={3}>
            <img
              className="onfour-logo-mobile"
              src={new_logo}
              width="auto"
              alt="nav-logo"
            ></img>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>

      <img
        className="onfour-logo-desktop"
        src={icon}
        width="auto"
        alt="nav-logo"
      ></img>

      <div className="page-links">
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
