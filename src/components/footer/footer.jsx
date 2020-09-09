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
      location.pathname === "/artist-stream"
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
                Copyright &copy; 2020 All Rights Reserved by onfour
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
          {/* <Grid className="footer-grid">
            <Row>
              <Col size={1}></Col>
              <Col size={5}>
                <div className="footer-logo-container">
                  <img
                    className="onfour-logo-footer"
                    src={white_logo}
                    width="auto"
                    alt="nav-logo"
                  ></img>
                </div>
              </Col>
              <Col size={1}></Col>
              <Col size={3}>
                <div className="footer-links">
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <a
                        onClick={() =>
                          Analytics.record({ name: "contactUsFooter" })
                        }
                        href="mailto:onfour.box@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <NavLink to="/privacy-policy" className="privacy-link">
                        Privacy Policy
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/terms-of-service" className="privacy-link">
                        Terms of Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/ticket-agreement" className="privacy-link">
                        Ticket Agreement
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col size={1}></Col>
            </Row>
            <Row>
              <Col size={1}></Col>
              <Col size={5}>
                <h6>Copyright &copy; 2020 All Rights Reserved by onfour</h6>
              </Col>
              <Col size={1}></Col>
              <Col size={3}>
                <div className="footer-social-media">
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
              </Col>
              <Col size={1}></Col>
            </Row>
          </Grid> */}
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
