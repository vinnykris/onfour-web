// React Imports
import React from "react";
import { Link } from "react-router-dom";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";
import Tag from "../tag";

// FeaturedContent is the unit element for an upcoming concert
const FeaturedContent = (props) => {
  return (
    <div>
      <Link
        to={{
          pathname: `/upcoming/${props.id}`,
          state: {
            info: props,
          },
        }}
      >
        <Grid className="featured-content">
          <Row>
            <div className="poster-container">
              <img
                className="concert-poster"
                src={props.img}
                alt="content-img"
              ></img>
            </div>
          </Row>
          <Row>
            <div className="show-content-bar">
              {/* <Row>
                <div className="genre-box">{props.genre.toUpperCase()}</div>
              </Row> */}
              <div className="tag-container featured-content-tag">
                <Tag content="In x days" />
              </div>
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
                    {props.week_day} | {props.date} | {props.formatted_time} EST{" "}
                  </p>
                </Col>
              </Row>
            </div>
          </Row>
        </Grid>
      </Link>
    </div>
  );
};

export default FeaturedContent;
