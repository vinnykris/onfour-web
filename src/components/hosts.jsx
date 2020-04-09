import React from "react";
import background from "../images/hosts_background.jpg";
import venue from "../images/venue_placeholder.jpg";
import application from "../images/application_icon.png";
import schedule from "../images/schedule-icon.png";
import music from "../images/host-music-icon.png";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import ContentHeader from "./content_header";
import FeaturedContent from "./featured_content";

const Hosts = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <p>Want to host a local livestream concert at your venue?</p>
              <Row>
                <Col size={2}></Col>
                <Col size={1}>
                  <button className="btn">Apply to Host</button>
                </Col>
                <Col size={1}>
                  <button className="btn">I've hosted before</button>
                </Col>
                <Col size={2}></Col>
              </Row>
              <img className="main-image" src={background} alt="nav-logo"></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <ContentHeader headerTitle={"Bring People Together, For Music"} />
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <p>
              Onfour enables you to easily host a unique experience at your
              venue, get new faces in your doors, and promote your brand.
            </p>
          </Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <img className="icon-image" src={application}></img>
          </Col>
          <Col size={1}>
            <img className="icon-image" src={schedule}></img>
          </Col>
          <Col size={1}>
            <img className="icon-image" src={music}></img>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <p>
              If you have never hosted an Onfour show, we need to understand a
              little bit about your space.
            </p>
          </Col>
          <Col size={1}>
            <p>
              Simply select the performance from the Onfour calendar that you're
              interested in hosting.
            </p>
          </Col>
          <Col size={1}>
            <p>
              On the day of the show, we will send a crew to help you setup, and
              clean up. All you have to do is open your doors and be yourself.
            </p>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <hr className="line-divider"></hr>
        </Row>
        <Row>
          <Col size={1}>
            <ContentHeader headerTitle={"Featured Venues"} />
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <p>
              Onfour collaborates with unique spaces around the country to bring
              you a new way to experience concerts.
            </p>
          </Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <FeaturedContent img={venue} />
          </Col>
          <Col size={1}>
            <FeaturedContent img={venue} />
          </Col>
          <Col size={1}>
            <FeaturedContent img={venue} />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <FeaturedContent img={venue} />
          </Col>
          <Col size={1}>
            <FeaturedContent img={venue} />
          </Col>
          <Col size={1}>
            <FeaturedContent img={venue} />
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Hosts;
