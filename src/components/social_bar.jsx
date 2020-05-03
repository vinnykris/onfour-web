// https://www.youtube.com/watch?v=woVuUbDOeMk

import React from "react";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import VenmoCode from "../images/jon_dely_venmo.jpeg";

const SocialBar = () => {
  return (
    <div className="social-bar-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Grid>
        <Row>
          <Col size={1}>
            <h3>Connect with the artist:</h3>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <div className="social-media">
              <ul className="social-list">
                <li>
                  <a
                    href="https://www.instagram.com/superduperfriend/"
                    class="fa fa-instagram"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://open.spotify.com/artist/58aQLz2Bw72YzALyncUm9T?si=6GjQHHueSvSM79yjCuY6-w"
                    class="fa fa-spotify"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UC8Mo_XFsrzJr7bxrwdQ93GQ/featured"
                    class="fa fa-youtube"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/superduperfriend"
                    class="fa fa-facebook"
                    target="_blank"
                  ></a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <p className="donation-link">
              Scan the QR code below to donate on Venmo! All proceeds will go to
              MusiCares.
            </p>
            <img className="venmo-code" src={VenmoCode}></img>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default SocialBar;
