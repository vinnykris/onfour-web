import React from "react";
import "./old_component_styles.scss";
import { Grid, Row, Col } from "../grid";

const HostApplication = () => {
  return (
    <div>
      <Grid>
        <Row>
          <div className="spacer"></div>
        </Row>

        <Row>
          <Col size={1}>
            <h4>Apply to be an Onfour host</h4>
          </Col>
        </Row>

        <Row>
          <div className="form-spacer"></div>
        </Row>

        <Row>
          <Col size={1}>
            <form>
              <Row>
                <h5>Personal information</h5>
              </Row>
              <Row>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                ></input>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                ></input>
              </Row>
              <Row>
                <div className="form-spacer"></div>
              </Row>

              <Row>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                ></input>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                ></input>
              </Row>

              <Row>
                <div className="form-spacer"></div>
              </Row>

              <Row>
                <h5>Date and Time</h5>
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
                <div className="form-spacer"></div>
              </Row>

              <Row>
                <button type="submit" name="submit">
                  Submit
                  <i class=""></i>
                </button>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default HostApplication;
