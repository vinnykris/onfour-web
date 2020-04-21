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
          <Col size={1}></Col>
        </Row>
      </Grid>
    </div>
  );
};

export default SocialBar;
