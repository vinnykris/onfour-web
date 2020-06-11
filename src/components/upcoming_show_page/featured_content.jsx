// React Imports
import React, { useState } from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

// Component Imports 
import BioModal from "./bio_modal";

// FeaturedContent is the unit element for an upcoming concert
const FeaturedContent = ({ img, name, concert_name, week_day, date, month, day, time, price, description, days_left, width, genre }) => {

  const [show_more_info, setClickedInfo] = useState(false); // Determines whether to show the popup for musician's bio or not

  // This function gets called when the MORE INFO button is clicked
  // and it sets the show_more_info to true
  const open_info = () => {
    setClickedInfo(true);
  };

  // This function gets called when the close button on the popup
  // is clicked and it sets the show_more_info to false
  const close_info = () => {
    setClickedInfo(false);
  };
  
  

  return (
    <Grid className="featured-content">
      {/* POP-UP FOR MUSICIAN'S BIO SECTION */}
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
                  {/* <p className="concert-description">{description}</p> */}
                </div>
              </form>
        </div>
        ) : null}
      <Row>
        <Col size={3} className="poster-container">
          <img className="concert-poster" src={img} alt="content-img"></img>
          <div className="poster-tag">
            <h4 className="poster-text">{month}</h4>
            <h1 className="poster-text">{day}</h1>
          </div>
          <div className="genre-tag">{genre}</div>
        </Col>
      </Row>
      <Row>
      <Col size={3} className="show-content-bar">
              <Row>
                <Col size={3}>
                  <p className="artist-name">{name} - {concert_name}</p>
                </Col>
              </Row>
              <Row>
                <Col size={3}>
                  <p className="time">{week_day} | {date} | {time} EST </p>
                </Col>
              </Row>
          </Col>
      </Row>
      <Row className="ticket">
        <Col size={3}>
          {price? (
            <button
              className="featured-content-button-border"
              // data-toggle="modal"
              // data-target="#ticketModal"
              id="ticket_button"
            >
              Ticket   {">"}
            </button>
          ) : (
              <button
                className="featured-content-button-border"
                onClick={open_info}
                id="more_info_button"
              >
                MORE INFO
              </button>
          )}
        </Col>
      </Row>
      </Grid>
  );
};

export default FeaturedContent;
