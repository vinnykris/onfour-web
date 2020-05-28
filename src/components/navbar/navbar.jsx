// React imports
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// GraphQL
import * as queries from "../../graphql/queries";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

// Component imports
import { Grid, Row, Col } from "../grid";
// import Login from "../login_page/login_page";
// import Register from "../register_page/register_page";

import LoginSwitcher from "../sign_in_mobile/login_switcher";

// Image imports
import new_logo_white from "../../images/logos/new_logo_white.png";

// Styles imports
import "./navbar_styles.scss";
import "../login_page/login_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

// Navbar component
const NavBar = () => {
  let navbar_custom = "navbar-black"; // Default navbar SASS class
  let style = "nav-page-white"; // Default navbar color style
  let icon = new_logo_white; // Default navbar icon
  let location = useLocation(); // Get location of user navigation

  const [dropdown_open, setDropdownOpen] = useState(false); // Tracks drop down menu
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [user_email, setUserEmail] = useState(""); // Tracks user's email after signing in
  const [first, setFirst] = useState(""); // Tracks first name of signed in user

  const [show_mobile_login, setShowMobileLogin] = useState(false); // Tracks whether user clicked sign-in or not on mobile

  const toggle = () => setDropdownOpen((prevState) => !prevState); // Toggle for dropdown menu

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  Auth.currentAuthenticatedUser({})
    .then((user) => setUserEmail(user.attributes.email))
    .then((user) => setAuth(true))
    // .then((user) => closeMenu())
    .catch((err) => setAuth(false));

  // If the first name for the logged in user's email has not been retrieved yet,
  // query the registration database's table to retrieve the first name filtered
  // for the specific email and assign that value to first
  if (first === "" && user_email !== "") {
    API.graphql(
      graphqlOperation(queries.query_name, {
        filter: { email: { eq: user_email } },
      })
    ).then((data) =>
      setFirst(data.data.listOnfour_registrations.items[0].first.toUpperCase())
    );
  }

  // Change styles if on about page
  if (location.pathname === "/") {
    navbar_custom = "navbar-custom";
  }

  // Open menu function for mobile
  const openMenu = () => {
    document.getElementById("nav-menu").style.height = "100%";
  };

  // Close menu function for mobile
  // This function is also passed as a prop to the grandchildren of this component,
  // in order to properly dismiss the image once the user is logged in.
  const closeMenu = () => {
    document.getElementById("nav-menu").style.height = "0%";
    document.getElementById("nav-links").style.visibility = "visible";
    document.getElementById("nav-links").style.display = "inline";
    setShowMobileLogin(false);
  };

  // Close menu after user navigates to new page
  useEffect(() => {
    closeMenu();
  }, []);

  // Function to sign out the user -- the window reloads after signing out
  const signOut = (event) => {
    Auth.signOut().then((user) => window.location.reload());
  };

  // Function to show the sign-in form
  const signInMobile = () => {
    setShowMobileLogin(true);
    document.getElementById("nav-links").style.visibility = "hidden";
    document.getElementById("nav-links").style.display = "none";
  };

  // Function to sign out the user
  const signOutMobile = () => {
    Auth.signOut();
    setShowMobileLogin(false);
    closeMenu();
  };

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
          <div id="nav-links" className="overlay-content">
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
            <div className="mobile-nav-link">
              <Row>
                <Col size={1}>
                  {(() => {
                    if (!auth) {
                      return (
                        <NavLink
                          to=""
                          className="nav-page-white mobile-link-text"
                          onClick={signInMobile}
                        >
                          SIGN IN
                        </NavLink>
                      );
                    } else {
                      return (
                        <NavLink
                          to=""
                          className="nav-page-white mobile-link-text"
                          onClick={signOutMobile}
                        >
                          SIGN OUT
                        </NavLink>
                      );
                    }
                  })()}
                </Col>
              </Row>
            </div>
          </div>
          {show_mobile_login ? (
            <div className="overlay-content">
              <LoginSwitcher closeMenu={closeMenu} />
            </div>
          ) : null}
          {/* <div id="nav-login" className="overlay-content">
            <Col size={6}>
              {is_processing ? (
                <p className="processing-message">Loading...</p>
              ) : (
                <form
                  className="login-form"
                  action="/"
                  id="login"
                  onSubmit={mobileSignIn}
                >
                  <Row>
                    <label className="label-text" for="email_slot">
                      Email Address*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="login-input"
                      type="email"
                      name="email"
                      id="email_slot"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </Row>
                  <br></br>
                  <Row>
                    <label className="label-text" for="password_slot">
                      Password*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="login-input"
                      type="password"
                      name="password"
                      id="password_slot"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </Row>
                  <div style={{ color: "red" }}>{error}</div>

                  <br></br>
                  <br></br>
                  <button
                    className="login-submit-button"
                    type="submit"
                    form="login"
                    value="Submit"
                  >
                    SIGN IN
                  </button>
                  <br></br>
                  <br></br>
                  <p className="label-text">
                    Don't have an account? Click{" "}
                    <span onClick={signUpToggle}>here</span> to sign up.
                  </p>
                </form>
              )}
            </Col>
          </div> */}
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
          <Col size={1}></Col>
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
          <Col size={1}>
            {(() => {
              if (!auth) {
                return (
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
                );
              } else {
                return (
                  <Dropdown isOpen={dropdown_open} toggle={toggle}>
                    <div className="toggle-color">
                      <DropdownToggle className="toggle-greeting" tag="a" caret>
                        HI, {first}
                      </DropdownToggle>
                    </div>
                    <DropdownMenu right>
                      <DropdownItem
                        className="sign-out-button"
                        onClick={signOut}
                      >
                        SIGN OUT
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                );
              }
            })()}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default NavBar;
