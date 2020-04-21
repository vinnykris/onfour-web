import React from "react";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import ContentHeader from "./content_header";
import FeaturedContent from "./featured_content";

const PerformApplication = () => {
  return (
    <div>

        <Row>
          <div className="spacer"></div>
        </Row>
        
      <Grid>
        <Row>
         <Col size={1}> </Col>
          <Col size={1}>
            <h4>Apply for your first Onfour show</h4>
          </Col>
          <Col size={1}> </Col>
        </Row>


        <Row>
           <div className="form-spacer"></div>
        </Row>


        <Row>
          <Col size={1}>
            <form>
              <Row>
                <h5>Personal Information</h5>
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
                </button>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default PerformApplication;
