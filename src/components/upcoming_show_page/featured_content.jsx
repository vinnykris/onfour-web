// React Imports
import React from "react";
import { Link } from "react-router-dom";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

// FeaturedContent is the unit element for an upcoming concert
const FeaturedContent = (props) => {
  return (
    <div className="single-element">
      <Link
        to={{
          pathname: `/upcoming/${props.id}`,
          state: {
            info: props,
          },
        }}
      >
        <Row className="more-info">
          <p className="more-info-text">MORE INFO</p>
        </Row>
        <Grid className="featured-content">
          <Row>
            <Col size={3} className="poster-container">
              <img
                className="concert-poster"
                src={props.img}
                alt="content-img"
              ></img>
            </Col>
          </Row>
          <Row>
            <Col size={3} className="show-content-bar">
              <Row>
                <div className="genre-box">{props.genre.toUpperCase()}</div>
              </Row>
              <Row>
                <Col size={3}>
                  <p className="artist-name">
                    {props.artist_name}
                    {/* - {props.concert_name} */}
                  </p>
                </Col>
              </Row>
              <Row className="time-row">
                <Col size={3}>
                  <p className="time">
                    {props.week_day} | {props.date} | {props.formatted_time}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Link>
    </div>
  );
};

export default FeaturedContent;
