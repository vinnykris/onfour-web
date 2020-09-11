// React Imports
import React from "react";
import { Link } from "react-router-dom";

// Styling Imports
import "./profile_show_styles.scss";
import { Grid, Row, Col } from "../grid";
import Tag from "../tag";

// FeaturedContent is the unit element for an upcoming concert
const ProfileShow = (props) => {
  return (
    <div className="profile-show-container">
      <img
        className="profile-show-poster"
        src={props.img}
        alt="profile-content-img"
      ></img>
      <div className="profile-show-overlay">
        <div className="profile-show-inner">
          <div className="show-info">
            <span className="header-4 profile-show-artist-name">
              {props.artist_name}
            </span>
            <span className="header-8 profile-show-logistics">
              {props.formatted_date}, {props.formatted_time}
            </span>
          </div>
          <div className="show-action-buttons">
            <button className="profile-action-button attend-button">
              <span className="segmented-button-text">Attend</span>
            </button>
            <button className="profile-action-button invite-button">
              <span className="segmented-button-text">Invite Crew</span>
            </button>
          </div>
        </div>
      </div>
      {/* 
      {props.upcoming ? (
        <Link
          to={{
            pathname: `/upcoming/${props.id}`,
            state: {
              info: props,
            },
          }}
          className="link-style"
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
                <div className="tag-container featured-content-tag">
                  <Tag content={"In " + props.days_left + " days"} />
                </div>
                <Row>
                  <Col size={1}>
                    <div className="subtitle-2 featured-content-info">
                      {props.artist_name}
                      <br></br>
                      {props.week_day} | {props.date} | {props.formatted_time}{" "}
                      EST
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
          </Grid>
        </Link>
      ) : (
        // <Link
        //   to={{
        //     pathname: `/upcoming/${props.id}`,
        //     state: {
        //       info: props,
        //     },
        //   }}
        //   className="link-style"
        // >
        <Grid className="featured-content-memory">
          <Row>
            <div className="poster-container">
              <img
                className="concert-poster"
                src={props.img}
                alt="content-img"
              ></img>
            </div>
          </Row>
        </Grid>
        // </Link>
      )} */}
    </div>
  );
};

export default ProfileShow;
