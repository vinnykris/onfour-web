// React
import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

// Components
import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";

// Styles
import "./footer_styles.scss";

// Images
// import white_logo from "../../images/logos/white-full-logo.png";
import desktop_icon from "../../images/logos/navbar-logo-pink.png";
import mobile_icon from "../../images/logos/logo-pink.png";

//AWS
import { Analytics } from "aws-amplify";

// Exports Footer components, containing logo, contact email, copyright information,
// and social media links
const Footer = () => {
  const [show_footer, setShowFooter] = useState(true); // Decide to show/hide the footer
  let location = useLocation(); // Get location of user navigation
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // When either screen width or location are updated, effect hook is run
  // Hides footer if stream page and on mobile
  useEffect(() => {
    if (
      location.pathname === "/stream" ||
      location.pathname === "/profile" ||
      location.pathname === "/soundcheck" ||
      location.pathname === "/artist-stream" ||
      location.pathname === "/register" ||
      location.pathname === "/login"
      // ||
      // location.pathname.includes("/upcoming/")
    ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location, width]);

  return (
    <div>
      {show_footer ? (
        <div>
        {width > 600 ?(  
          <div className="footer-container">
            <div className="footer-inner-container">
              <div className="footer-column-main">
                <img className="onfour-logo-container" src={desktop_icon}></img>
                <span className="header-8 footer-text-body">
                  Experience music, together.
                </span>
              </div>
              <div className="footer-link-container">
                <div className="footer-column-content">
                  <span className="header-8 footer-text-title">Explore</span>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/home"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/stream"
                  >
                    Stream
                  </NavLink>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/upcoming"
                  >
                    Upcoming
                  </NavLink>
                </div>
                <div className="footer-column-content">
                  <span className="header-8 footer-text-title">Legal</span>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/terms-of-service"
                  >
                    Terms of Service
                  </NavLink>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </NavLink>
                  <NavLink
                    className="header-8 footer-text-body footer-link"
                    to="/ticket-agreement"
                  >
                    Ticket Agreement
                  </NavLink>
                </div>
                <div className="footer-column-content">
                  <span className="header-8 footer-text-title">Collaborate</span>
                  <a
                    onClick={() => Analytics.record({ name: "contactUsFooter" })}
                    href="mailto:onfour.box@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-8 footer-text-body footer-link"
                  >
                    onfour.box@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-inner-container">
              <div className="footer-bottom">
                <span className="header-8 footer-text-body">
                  Copyright &copy; 2020 All Rights Reserved by onfour Inc.
                </span>
                <div className="footer-social-media">
                  <ul>
                    <li>
                      <a
                        onClick={() => Analytics.record({ name: "instaFooter" })}
                        href="https://www.instagram.com/_onfour/"
                        target="_blank"
                        className="fa fa-instagram"
                        rel="noopener noreferrer"
                      >
                        <span className="hidden-text">Instagram Link</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          Analytics.record({ name: "youtubeFooter" })
                        }
                        href="https://www.youtube.com/channel/UCwbWryexV1632eZ_pILnmTQ/featured"
                        target="_blank"
                        className="fa fa-youtube"
                        rel="noopener noreferrer"
                      >
                        <span className="hidden-text">Youtube Link</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          Analytics.record({ name: "twitterFooter" })
                        }
                        href="https://twitter.com/_Onfour"
                        target="_blank"
                        className="fa fa-twitter"
                        rel="noopener noreferrer"
                      >
                        <span className="hidden-text">Twitter Link</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ):(
          <div className="footer-container mobile-footer">
          <Grid className="footer-grid">
            <Row> 
              <Col size={1}>
                <div className="mobile-footer-logo-container">
                  <img
                    className="mobile-onfour-logo-footer"
                    src={mobile_icon}
                    width="auto"
                    height="49px"
                    alt="nav-logo"
                  ></img>
                </div>
                <div className="mobile-onfour-logo-subheading">
                  <h4 className="header-9">Experience Music Together</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="mobile-footer-link-container">
                <div className="mobile-footer-column-content">
                  <span className="header-10 footer-text-title">Explore</span>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/home"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/stream"
                  >
                    Stream
                  </NavLink>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/upcoming"
                  >
                    Upcoming
                  </NavLink>
                </div>
                <div className="mobile-footer-column-content">
                  <span className="header-10 footer-text-title">Legal</span>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/terms-of-service"
                  >
                    Terms of Service
                  </NavLink>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </NavLink>
                  <NavLink
                    className="header-10 footer-text-body mobile-footer-link"
                    to="/ticket-agreement"
                  >
                    Ticket Agreement
                  </NavLink>
                </div>
                <div className="mobile-footer-column-content last-mobile-footer-column-content">
                  <span className="header-10 footer-text-title">Collaborate</span>
                  <a
                    onClick={() => Analytics.record({ name: "contactUsFooter" })}
                    href="mailto:onfour.box@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-10 footer-text-body mobile-footer-link"
                  >
                    onfour.box@gmail.com
                  </a>
                  <div className="mobile-footer-social-media">
                    <ul>
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({ name: "instaFooter" })
                          }
                          href="https://www.instagram.com/_onfour/"
                          target="_blank"
                          className="fa fa-instagram"
                          rel="noopener noreferrer"
                        >
                          <span className="hidden-text">Instagram Link</span>
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({ name: "youtubeFooter" })
                          }
                          href="https://www.youtube.com/channel/UCwbWryexV1632eZ_pILnmTQ/featured"
                          target="_blank"
                          className="fa fa-youtube"
                          rel="noopener noreferrer"
                        >
                          <span className="hidden-text">Youtube Link</span>
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({ name: "twitterFooter" })
                          }
                          href="https://twitter.com/_Onfour"
                          target="_blank"
                          className="fa fa-twitter"
                          rel="noopener noreferrer"
                        >
                          <span className="hidden-text">Twitter Link</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <Col size={1}>
                <div className="footer-links">
                  <div className="header-10 mobile-column-title">Explore</div>
                  <ul>
                    <li>
                      <a href="/about" className="header-10">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/artiststream" className="header-10">
                      Stream
                      </a>
                      </li>
                    <li>
                      <a href="/upcoming" className="header-10">
                      Upcoming
                      </a>
                      </li>
                  </ul>
                </div>
              </Col>
              <Col size={2}>
                <div className="footer-links">
                  <div className="header-10 mobile-column-title">Legal</div>
                  <ul>
                    <li>
                      <NavLink to="/terms-of-service" className="privacy-link header-10">
                        Terms of Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/privacy-policy" className="privacy-link header-10">
                        Privacy Policy
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/ticket-agreement" className="privacy-link header-10">
                        Ticket Agreement
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col size={2}>
                <div className="footer-links">
                  <div className="header-10 mobile-column-title">Collaborate</div>
                  <ul>
                    <li>
                      <a
                        onClick={() =>
                          Analytics.record({ name: "contactUsFooter" })
                        }
                        href="mailto:onfour.box@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-10"
                      >
                        onfour.box@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </Col> */}
            </Row>
            <Row className="mobile-copyright-row">
              <Col size={1}>
                <div className="header-10 mobile-copyright-text">Copyright &copy; 2020 All Rights Reserved by onfour Inc.</div>
              </Col>
            </Row>
          </Grid>
        </div>
      )}
      </div>
      ) : null}
    </div>
  );
};

export default Footer;
