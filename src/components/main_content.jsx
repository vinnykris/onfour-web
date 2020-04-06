import React from "react";
import background from "../images/home_page_background.jpeg";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";

const MainContent = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <img
              className="background-image"
              src={background}
              alt="nav-logo"
            ></img>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default MainContent;
