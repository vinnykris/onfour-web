import React from "react";
import whatsonfour from "../images/whatsonfour_background.jpg";
import tickets from "../images/tickets-icon.png";
import schedule from "../images/schedule-icon.png";
import performance from "../images/performance-icon.png";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";

const WhatsOnFour = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <p>
                Attend a local venue or host a listening party. <br></br>Onfour
                brings your favorite musicians to you by interactive livestream.
              </p>
              <img
                className="main-image"
                src={whatsonfour}
                alt="nav-logo"
              ></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <h1 className="header">Our Mission</h1>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <p className="paragraph-text">
              Onfour empowers music fans by providing a new way to interact with
              your favorite musicians, no matter where you are. Musicians gain
              more control over their careers and connect with fans in new,
              meaningful ways. We have curated a new form of streaming
              experience that connects local fans to enjoy their favorite
              musicians, together.
            </p>
            <hr className="line-divider"></hr>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <h1 className="header">How We Work</h1>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <img className="icon-image" src={schedule}></img>
          </Col>
          <Col size={1}>
            <img className="icon-image" src={performance}></img>
          </Col>
          <Col size={1}>
            <img className="icon-image" src={tickets}></img>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <p className="description-text">
              Musicians register a date and time to perform.
            </p>
          </Col>
          <Col size={1}>
            <p className="description-text">
              Local venues choose to host the concert.
            </p>
          </Col>
          <Col size={1}>
            <p className="description-text">
              Fans purchase tickets to their preferred venue.
            </p>
          </Col>
        </Row>
        <hr className="line-divider"></hr>
        <Row>
          <Col size={1}>
            <h2 className="header">Search</h2>
            <p className="description-text">
              Onfour brings your favorite musicians to you by livestream. We
              need your location to help you find the right event for you.
              Search your favorite musicians or a convenient location to find
              upcoming events on a date that works with your schedule.
            </p>
          </Col>
          <Col size={1}>
            <h2 className="header">Purchase</h2>
            <p className="description-text">
              Lock down the details and purchase your tickets to the show. Make
              sure you are able to present your tickets come the day of the
              show.
            </p>
          </Col>
          <Col size={1}>
            <h2 className="header">Enjoy</h2>
            <p className="description-text">
              Show up to your event location, bring something to drink, and be
              ready to have an awesome time!
            </p>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <h2 className="header">Explore Onfour shows in your city:</h2>
            <p>Search bar placeholder!</p>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default WhatsOnFour;
