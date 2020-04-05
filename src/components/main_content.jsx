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
        {/* <Row>
          <Col size={1}>COLUMN 1</Col>
          <Col size={2}>COLUMN 2</Col>
          <Col size={1}>COLUMN 3</Col>
        </Row> */}
      </Grid>
    </div>
  );
};

export default MainContent;
