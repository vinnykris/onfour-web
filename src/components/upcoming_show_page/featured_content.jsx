// React Imports
import React from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

<<<<<<< HEAD
const FeaturedContent = ({ img, name, concert_name, date, month, day, time }) => {
  return (
    <Grid className="featured-content">
      <Col size={3} className="date-content-bar">
          <img className="concert-poster" src={img} alt="content-img"></img>
          <div className="poster-tag">
            <h4 className="poster-text">{month}</h4>
            <h1 className="poster-text">{day}</h1>
          </div>
        </Col>
      <Col size={3} className="show-content-bar">
=======
// FeaturedContent defines the layout of each upcoming concert elements
// It takes in concert's information as input
const FeaturedContent = ({ img, name, date, time }) => {
  return (
    <div className="featured-content">
      <Grid>
        <Row>
          <Col size={1}></Col>
          <Col size={3}>
            <div className="date-content-bar">
              <Col size={0.5}>
              </Col>
              <Col size={2.5}>
                <img className="feature-placeholder" src={img} alt="content-img"></img>
              </Col>
              
            </div>
          </Col>
          <Col size={3}>
            <div className="show-content-bar">
>>>>>>> 65b05f444333d4f1c2f16cddd3babfda6c2338ba
              <Row>
                <Col size={3}>
                  <p className="artist-name">{name} : {concert_name}</p>
                </Col>
              </Row>
              <Row>
                <Col size={3}>
                  <p className="time">{time}</p>
                  <p className="date">{date}</p>
                  
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
          </Col>
      </Grid>
  );
};

export default FeaturedContent;
