// https://www.youtube.com/watch?v=woVuUbDOeMk

import React from "react";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";

const SocialBar = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Grid>
        <Row>
          <Col size={1}></Col>
          <div class="social-media">
            <ul>
              <li>
                <a href="#" class="fa fa-instagram"></a>
              </li>
              <li>
                <a href="#" class="fa fa-spotify"></a>
              </li>
              <li>
                <a href="#" class="fa fa-youtube"></a>
              </li>
              <li>
                <a href="#" class="fa fa-facebook"></a>
              </li>
            </ul>
          </div>
          <Col size={1}></Col>
        </Row>
      </Grid>
    </div>
  );
};

export default SocialBar;
