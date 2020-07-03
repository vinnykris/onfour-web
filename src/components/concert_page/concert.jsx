// React Imports
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { withRouter } from "react-router";

// Styling Imports
import "./concert_styles.scss";
import { Grid, Row, Col } from "../grid";

// AWS Imports
import { Analytics } from "aws-amplify";
import { useEffect } from "react";

// Component Imports

// FeaturedContent is the unit element for an upcoming concert
const Concert = (props) => {
  const [concert_info, setConcertInfo] = useState(
    props.location.state.concert_info
  );
  useEffect(() => {
    console.log("mounted");
    console.log(concert_info);
  }, []);

  return (
    <div className="concert-page">
      <Grid>
        <Row className="info-row">
          <Col size={1} className="concert-info-col">
            <div className="concert-image-container">
              <img className="concert-image" src={concert_info.img}></img>
            </div>
            <div className="concert-logistics">
              <Row>
                <span>{props.day}</span>
              </Row>
              <Row>
                <span>{props.time}</span>
              </Row>
              <Row>
                <span>LOCATION</span>
              </Row>
            </div>
          </Col>
          <Col size={2} className="concert-info-col">
            <Row>
              <Col size={1}>
                <div className="countdown-timer">
                  <span className="countdown">COUNTDOWN TIMER</span>
                </div>
              </Col>
              <Col size={1}>
                <div className="buy-ticket">
                  <button>Buy Ticket</button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="suggested-shows"></Row>
      </Grid>
    </div>
  );
};

export default withRouter(Concert);
