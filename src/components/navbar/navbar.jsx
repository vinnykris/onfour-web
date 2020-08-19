// React imports
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

// Component imports
import { Grid, Row, Col } from "../grid";
import LoginSwitcher from "../sign_in_mobile/login_switcher";
import LoggedInUser from "../sign_in_mobile/logged_in_user";
import { useWindowDimensions } from "../custom_hooks";
import history from "../../history";

// Image imports
import new_logo_white from "../../images/logos/new_logo_white.png";
import login_icon from "../../images/icons/login.png";
import desktop_icon from "../../images/logos/navbar-logo-pink.png";

// Styles imports
import "./navbar_styles.scss";
import "../login_page/login_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

// Navbar component
const NavBar = () => {
  let navbar_custom = "navbar-black"; // Default navbar SASS class
  let style = "nav-page-white"; // Default navbar color style
  let icon = new_logo_white; // Default navbar icon
  let desktop_logo = desktop_icon; // New Navbar Desktop icon
  let location = useLocation(); // Get location of user navigation

  const [dropdown_open, setDropdownOpen] = useState(false); // Tracks drop down menu
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [user_email, setUserEmail] = useState(""); // Tracks user's email after signing in
  const [username, setUsername] = useState(""); // Tracks user's username after signing in
  const [profile_url, setProfileURL] = useState(""); // Tracks user's username after signing in
  const [first, setFirst] = useState(""); // Tracks first name of signed in user
  const [last, setLast] = useState(""); // Tracks first name of signed in user

  const [show_mobile_login, setShowMobileLogin] = useState(false); // Tracks whether user clicked sign-in or not on mobile

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  const toggle = () => setDropdownOpen((prevState) => !prevState); // Toggle for dropdown menu

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  Auth.currentAuthenticatedUser({})
    .then((user) => {
      setUserEmail(user.attributes.email);
      setAuth(true);
      setUsername(user.username);
      setProfileURL("");
    })
    .catch((err) => setAuth(false));

  // Fetching the first name of a signed in user
  const getUserData = async () => {
    const user_data = await API.graphql(
      graphqlOperation(queries.get_user_data, {
        input: username,
      })
    );
    setFirst(user_data.data.getCreateOnfourRegistration.first);
  };

  if (username) {
    getUserData();
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

  // Function to leave video chat for desktop version
  const leaveVideoChat = () => {
    if (document.getElementById("leave-call-button")) {
      document.getElementById("leave-call-button").click();
    }
  };
  // On mobile, redirects to profile page and closes the modal
  const openProfile = () => {
    history.push("/profile");
    closeMenu("nav-signout");
  };

  // On desktop, redirects to profile page
  const openProfileDesktop = () => {
    history.push("/profile");
  };

  return (
    <div className="navbar-black">
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
                    <div className="greeting-mobile">
                      <p className="greeting-mobile-text">Hi, {first}! </p>
                    </div>
                  </div>
                </Row>
                <Row className="mobile-dropdown-row">
                  <button
                    className="sign-out-button-mobile"
                    onClick={openProfile}
                  >
                    MY PROFILE
                  </button>
                </Row>
                <Row className="mobile-dropdown-row">
                  <button
                    className="sign-out-button-mobile"
                    onClick={signOutMobile}
                  >
                    SIGN OUT
                  </button>
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
                      first={username}
                      // last={last}
                    />
                  </span>
                )}
              </Col>
            </Row>
          </Grid>
        </div>
      ) : (
        <div className="main-content desktop-nav-main">
          {/* DESKTOP CODE */}
          <div className="onfour-nav-logo">
            <NavLink exact to="/" onClick={leaveVideoChat}>
              {" "}
              <img
                className="desktop-logo"
                src={desktop_logo}
                width="auto"
                alt="nav-logo"
              ></img>
            </NavLink>
          </div>
          <div className="nav-links-container">
            <NavLink
              exact
              to="/"
              className="nav-page-white header-5"
              onClick={leaveVideoChat}
            >
              About Us
            </NavLink>
            <NavLink
              to="/artists"
              className="nav-page-white header-5"
              onClick={leaveVideoChat}
            >
              For Artists
            </NavLink>
            <NavLink
              to="/stream"
              className="nav-page-white header-5"
              onClick={leaveVideoChat}
            >
              Stream
            </NavLink>
            <NavLink
              to="/upcoming"
              className="nav-page-white header-5"
              onClick={leaveVideoChat}
            >
              Upcoming
            </NavLink>
            {!auth ? (
              <div className="login-link-container header-5">
                <NavLink
                  to={{
                    pathname: "/login",
                    state: { current: location },
                  }}
                  className="sign-in-link"
                  onClick={leaveVideoChat}
                >
                  Log In
                </NavLink>
              </div>
            ) : (
              <div className="login-link-container logged-in header-5">
                <Dropdown
                  isOpen={dropdown_open}
                  toggle={toggle}
                  className="dropdown-placement"
                >
                  <div className="toggle-color">
                    <DropdownToggle tag="a" caret>
                      <img
                        className="user-icon-desktop"
                        src={login_icon}
                        alt="profile-icon"
                      ></img>
                      {first} {""}
                    </DropdownToggle>
                  </div>
                  <DropdownMenu
                    className="user-dropdown-menu"
                    positionFixed="false"
                  >
                    <DropdownItem
                      className="sign-out-button"
                      onClick={openProfileDesktop}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem className="sign-out-button" onClick={signOut}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
