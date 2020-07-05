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
import CountdownTimer from "../countdown_timer/countdown_timer";

// FeaturedContent is the unit element for an upcoming concert
const Concert = (props) => {
  const [concert_info, setConcertInfo] = useState(
    props.location.state.concert_info
  );

  var weekday = new Array(7);
  weekday[0] = "SUNDAY";
  weekday[1] = "MONDAY";
  weekday[2] = "TUESDAY";
  weekday[3] = "WEDNESDAY";
  weekday[4] = "THURSDAY";
  weekday[5] = "FRIDAY";
  weekday[6] = "SATURDAY";
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
                <div className="concert-genre-box">
                  {concert_info.genre.toUpperCase()}
                </div>
              </Row>
              <Row className="logistics-row">
                <span className="logistics-text">
                  {weekday[new Date(concert_info.date).getDay()]},{" "}
                  {concert_info.formatted_date}
                </span>
              </Row>
              <hr class="solid" />
              <Row className="logistics-row">
                <span className="logistics-text">
                  {concert_info.formatted_time} EST
                </span>
              </Row>
              <hr class="solid" />
              <Row className="logistics-row">
                <span className="logistics-text">STREAMED FROM NEW YORK</span>
              </Row>
              <hr class="solid" />
            </div>
          </Col>
          <Col size={2} className="concert-info-col main-info-col">
            <Row className="countdown-and-buttons">
              <Col size={1}>
                <div className="countdown-timer">
                  {/* <span className="countdown">COUNTDOWN TIMER</span> */}
                  <CountdownTimer
                    start_date={concert_info.date}
                    start_time={concert_info.time}
                  />
                </div>
              </Col>
              <Col size={1}>
                <div className="buy-ticket">
                  <button className="buy-ticket-button">Buy Ticket</button>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="concert-text-container">
                <Col size={1}>
                  <div>
                    <h3 className="titles">
                      {concert_info.name.toUpperCase()} –{" "}
                      {concert_info.concert_name.toUpperCase()}
                    </h3>
                  </div>
                  <div>
                    <p className="artist-description-text">
                      {concert_info.description}
                    </p>
                  </div>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="suggested-shows"></Row>
      </Grid>
    </div>
  );
};

export default withRouter(Concert);
