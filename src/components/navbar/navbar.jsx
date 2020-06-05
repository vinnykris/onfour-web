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
import LoginSwitcher from "../sign_in_mobile/login_switcher";
import LoggedInUser from "../sign_in_mobile/logged_in_user";
import { useWindowDimensions } from "../custom_hooks";

// Image imports
import new_logo_white from "../../images/logos/new_logo_white.png";
import login_icon from "../../images/icons/login.png";

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
  const [username, setUsername] = useState(""); // Tracks user's email after signing in
  const [first, setFirst] = useState(""); // Tracks first name of signed in user
  const [last, setLast] = useState(""); // Tracks first name of signed in user

  const [show_mobile_login, setShowMobileLogin] = useState(false); // Tracks whether user clicked sign-in or not on mobile

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  const toggle = () => setDropdownOpen((prevState) => !prevState); // Toggle for dropdown menu

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  Auth.currentAuthenticatedUser({})
    .then((user) => setUserEmail(user.attributes.email))
    // .then((user) => setUsername(user.username))
    .then((user) => setAuth(true))
    // .then((user) => closeMenu())
    .catch((err) => setAuth(false));

  // If the first and last name for the logged in user's email has not been retrieved yet,
  // query the registration database's table to retrieve the first and last name filtered
  // for the specific email and assign that value to first and last
  if (first === "" && last === "" && user_email !== "") {
    API.graphql(
      graphqlOperation(queries.query_name, {
        filter: { email: { eq: user_email } },
      })
    ).then((data) => {
      setFirst(
        data.data.listCreateOnfourRegistrations.items[0].first.toUpperCase()
      );
      setLast(
        data.data.listCreateOnfourRegistrations.items[0].last.toUpperCase()
      );
    });
  }

  // Change styles if on about page
  if (location.pathname === "/") {
    navbar_custom = "navbar-custom";
  }

  // Open menu function for mobile
  const openMenu = (id) => {
    document.getElementById(id).style.height = "100%";
  };

  // Close menu function for mobile
  // This function is also passed as a prop to the grandchildren of this component,
  // in order to properly dismiss the image once the user is logged in.
  const closeMenu = (id) => {
    document.getElementById(id).style.height = "0%";
    setShowMobileLogin(false);
  };

  // Function to sign out the user -- the window reloads after signing out
  const signOut = (event) => {
    Auth.signOut().then((user) => window.location.reload());
  };

  // Function to show the sign-in form
  const signInMobile = () => {
    setShowMobileLogin(true);
    openMenu("nav-signin");
  };

  // Function to sign out the user
  const signOutMobile = () => {
    signOut();
    setShowMobileLogin(false);
    closeMenu("nav-signout");
  };

  return (
    <div className={navbar_custom}>
      {width <= 600 ? (
        <div className="main-content">
          {/* MOBILE CODE */}
          <div id="nav-menu" className="overlay">
            <Grid>
              <Row>
                <Col size={1}>
                  <span
                    className="navbar-close"
                    onClick={() => closeMenu("nav-menu")}
                  >
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
                        onClick={() => closeMenu("nav-menu")}
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
                        to="/artists"
                        className="nav-page-white mobile-link-text"
                        onClick={() => closeMenu("nav-menu")}
                      >
                        FOR ARTISTS
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
                        onClick={() => closeMenu("nav-menu")}
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
                        onClick={() => closeMenu("nav-menu")}
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
                        onClick={() => closeMenu("nav-menu")}
                      >
                        PAST SHOWS
                      </NavLink>
                    </Col>
                  </Row>
                </div>
              </div>
            </Grid>
          </div>

          <div id="nav-signin" className="overlay">
            <Grid>
              <Row>
                <Col size={1}>
                  <span
                    className="navbar-close"
                    onClick={() => closeMenu("nav-signin")}
                  >
                    <i className="fa fa-times fa-2x close-icon"></i>
                  </span>
                </Col>
              </Row>
              <div className="signin-content">
                {show_mobile_login ? (
                  <LoginSwitcher closeMenu={() => closeMenu("nav-signin")} />
                ) : null}
              </div>
            </Grid>
          </div>

          <div id="nav-signout" className="overlay">
            <Grid>
              <Row>
                <Col size={1}>
                  <span
                    className="navbar-close"
                    onClick={() => closeMenu("nav-signout")}
                  >
                    <i className="fa fa-times fa-2x close-icon"></i>
                  </span>
                </Col>
              </Row>
              <div className="signin-content">
                <Row>
                  <div className="sign-out-container">
                    <Col size={1}>
                      <div className="greeting-mobile">
                        <p className="greeting-mobile-text">HI, {first} </p>
                      </div>
                      <button
                        className="sign-out-button-mobile"
                        onClick={signOutMobile}
                      >
                        SIGN OUT
                      </button>
                    </Col>
                  </div>
                </Row>
              </div>
            </Grid>
          </div>

          <Grid className="mobile-grid">
            <Row className="mobile-row">
              <Col size={1}>
                <span
                  className="hamburger-menu"
                  onClick={() => openMenu("nav-menu")}
                >
                  <i className="fa fa-bars fa-2x hamburger-icon"></i>
                </span>
              </Col>
              <Col size={3}>
                <NavLink exact to="/">
                  <img
                    className="onfour-logo-mobile"
                    src={new_logo_white}
                    width="auto"
                    alt="nav-logo"
                  ></img>
                </NavLink>
              </Col>
              <Col size={1}>
                {!auth ? (
                  <span className="user-menu" onClick={signInMobile}>
                    <img
                      className="user-icon"
                      src={login_icon}
                      alt="profile-icon"
                    ></img>
                  </span>
                ) : (
                  <span
                    className="user-menu"
                    onClick={() => openMenu("nav-signout")}
                  >
                    <LoggedInUser
                      className="logged-in-icon"
                      first={first}
                      last={last}
                    />
                  </span>
                )}
              </Col>
            </Row>
          </Grid>
        </div>
      ) : (
        <div className="main-content">
          {/* DESKTOP CODE */}
          <Grid className="desktop-grid">
            <Row className="desktop-row">
              <Col size={1}>
                <NavLink to="/archive" className={style}>
                  PAST SHOWS
                </NavLink>
              </Col>
              <Col size={1}>
                <NavLink to="/artists" className={style}>
                  FOR ARTISTS
                </NavLink>
              </Col>
              <Col size={1}>
                <NavLink exact to="/" className={style}>
                  ABOUT US
                </NavLink>
              </Col>
              <Col size={1}>
                <NavLink exact to="/">
                  {" "}
                  <img
                    className="onfour-logo-desktop"
                    src={icon}
                    width="auto"
                    alt="nav-logo"
                  ></img>
                </NavLink>
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
                        LOGIN
                      </NavLink>
                    );
                  } else {
                    return (
                      <Dropdown isOpen={dropdown_open} toggle={toggle}>
                        <div className="toggle-color">
                          <DropdownToggle
                            className="toggle-greeting"
                            tag="a"
                            caret
                          >
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
      )}
    </div>
  );
};

export default NavBar;
