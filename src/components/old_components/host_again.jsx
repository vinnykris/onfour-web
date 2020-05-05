import React from "react";
import "./old_component_styles.scss";
import { Grid, Row, Col } from "../grid";

const HostAgain = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <h1>Host a new show</h1>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <form>
              <Row>
                <h2>Date and Time</h2>
              </Row>
              <Row>
                <input type="text" name="date" placeholder=" DD/MM/YY"></input>
                <input
                  type="text"
                  name="time"
                  placeholder="6:00PM-8:00PM EST"
                ></input>
              </Row>
              <Row>
                <button type="submit" name="submit">
                  Submit
                </button>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default HostAgain;
