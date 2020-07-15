// React Imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

// AWS Imports
import { Analytics } from "aws-amplify";

// Component Imports
import BioModal from "./bio_modal";

// FeaturedContent is the unit element for an upcoming concert
const FeaturedContent = (props) => {
  const [show_more_info, setClickedInfo] = useState(false); // Determines whether to show the popup for musician's bio or not

  // This function gets called when the MORE INFO button is clicked
  // and it sets the show_more_info to true
  const open_info = () => {
    setClickedInfo(true);
    const event_name = (props.name + props.date).replace(/\s/g, ""); // unique identifier for event
    Analytics.record({ name: event_name }); // record analytics for specific "MORE INFO" click
  };

  // This function gets called when the close button on the popup
  // is clicked and it sets the show_more_info to false
  const close_info = () => {
    setClickedInfo(false);
  };

  return (
    <div className="single-element">
      {/* POP-UP FOR MUSICIAN'S BIO SECTION
      {show_more_info ? (
        <div className="popup-artist-info">
          <form className="concert-form">
            <span className="popup-info-close" onClick={close_info}>
              <i className="fa fa-times close-icon"></i>
            </span>
            <div className="popup-info-content">
              <BioModal
                days_left={days_left}
                artist_name={name}
                concert_name={concert_name}
                img={img}
                price={price}
                weekday={week_day}
                date={date}
                time={time}
                description={description}
                width={width}
              ></BioModal>
            </div>
          </form>
        </div>
      ) : null}
      <Row className="RSVP">
        {price ? (
          <p className="RSVP-text">BUY TICKET</p>
        ) : (
          <p className="RSVP-text">MORE INFO</p>
        )}
      </Row> */}
      <Link
        to={{
          pathname: `/upcoming/${props.id}`,
          state: {
            info: props,
          },
        }}
      >
        <Grid className="featured-content" onClick={open_info}>
          <Row>
            <Col size={3} className="poster-container">
              <img
                className="concert-poster"
                src={props.img}
                alt="content-img"
              ></img>
              {/* <div className="poster-tag">
              <h4 className="poster-text">{month}</h4>
              <h1 className="poster-text">{day}</h1>
            </div> */}
              {/* <div className="genre-tag">{genre}</div> */}
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
                    {props.name} - {props.concert_name}
                  </p>
                </Col>
              </Row>
              <Row className="time-row">
                <Col size={3}>
                  <p className="time">
                    {props.week_day} | {props.date} | {props.time} EST{" "}
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
