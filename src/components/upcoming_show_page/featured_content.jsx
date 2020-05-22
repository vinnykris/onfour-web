// React Imports
import React from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

const FeaturedContent = ({ img, name, concert_name, date, month, day, time }) => {
  return (
    <Grid className="featured-content">
      <Row>
      <Col size={3} className="date-content-bar">
          <img className="concert-poster" src={img} alt="content-img"></img>
          <div className="poster-tag">
            <h4 className="poster-text">{month}</h4>
            <h1 className="poster-text">{day}</h1>
          </div>
        </Col>
      </Row>
      <Row>
      <Col size={3} className="show-content-bar">
              <Row>
                <Col size={3}>
                  <p className="artist-name">{name} : {concert_name}</p>
                </Col>
              </Row>
              <Row>
                <Col size={3}>
                  <p className="time">{date} | {time}</p>
                </Col>
              </Row>
          </Col>
      </Row>
      <Row>
        <Col size={3} className="ticket">
          <button
            className="stripe-button-border"
            data-toggle="modal"
            data-target="#ticketModal"
          >
            Ticket   >
          </button>{" "}
        </Col>
      </Row>
      </Grid>
  );
};

export default FeaturedContent;
