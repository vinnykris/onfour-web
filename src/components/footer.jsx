import React from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col } from "./grid";
import "../styles.scss";

const Footer = () => {
  return (
    <div class="footer-container">
      <Grid>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <h3>About</h3>
            <p>
              Onfour is a platform that empowers music fans by providing them
              with a more intimate and unique concert-going experience.
              Musicians live-stream studio performances to fans at
              non-traditional venues, engaging and interacting with fans in a
              new way.
            </p>
          </Col>
          <Col size={1}></Col>
          <Col size={1}>
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
              <li>
                <a href="">Donate</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col size={1}></Col>
        </Row>
        <hr></hr>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <p>Copyright &copy; 2020 All Rights Reserved by Onfour</p>
          </Col>
          <Col size={1}></Col>
          <Col size={1}>
            <ul class="social">
              <li>
                <a class="facebook" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a class="instagram" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a class="twitter" href="#">
                  Twitter
                </a>
              </li>
            </ul>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Footer;
