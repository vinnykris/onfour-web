import React from "react";
import { Grid, Row, Col } from "../grid";
import "./footer_styles.scss";
import white_logo from "../../images/logos/logo_blackbackground.png";

const Footer = () => {
  return (
    <div class="footer-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Grid>
        <Row>
          <Col size={1}></Col>
          <Col size={5}>
            {/* <h3>About</h3>
            <p>
              Onfour is a platform that empowers music fans by providing them
              with a more intimate and unique concert-going experience.
              Musicians live-stream studio performances to fans at
              non-traditional venues, engaging and interacting with fans in a
              new way.
            </p> */}
            <img
              className="onfour-logo-footer"
              src={white_logo}
              width="auto"
              alt="nav-logo"
            ></img>
          </Col>

          <Col size={1}></Col>
          <Col size={3}>
            <div class="footer-links">
              <h3>Quick Links</h3>
              <ul>
                {/* <li>
                <a href="">About Us</a>
              </li> */}
                <li>
                  <a
                    href="mailto:onfour.box@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </li>
                {/* <li>
                  <a href="">Donate</a>
                </li> */}
                {/* <li>
                <a href="">Privacy Policy</a>
              </li> */}
              </ul>
            </div>
          </Col>
          <Col size={1}></Col>
        </Row>
        <hr></hr>
        <Row>
          <Col size={1}></Col>
          <Col size={5}>
            <h6>Copyright &copy; 2020 All Rights Reserved by Onfour</h6>
          </Col>
          <Col size={1}></Col>
          <Col size={3}>
            <div class="footer-social-media">
              <ul>
                <li>
                  <a
                    href="https://www.instagram.com/_onfour/"
                    target="_blank"
                    class="fa fa-instagram"
                    rel="noopener noreferrer"
                  >
                    <span className="hidden-text">Instagram Link</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCwbWryexV1632eZ_pILnmTQ/featured"
                    target="_blank"
                    class="fa fa-youtube"
                    rel="noopener noreferrer"
                  >
                    <span className="hidden-text">Youtube Link</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/_Onfour"
                    target="_blank"
                    class="fa fa-twitter"
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
  );
};

export default Footer;
