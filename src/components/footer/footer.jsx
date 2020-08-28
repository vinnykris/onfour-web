// React
import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

// Components
import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";

// Styles
import "./footer_styles.scss";

// Images
import white_logo from "../../images/logos/logo_blackbackground.png";

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
          <Grid className="footer-grid">
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
            <hr></hr>
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
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
