import React from "react";
import background from "../images/hosts_background.jpg";
import venue from "../images/venue_placeholder.jpg";
import application from "../images/application_icon.png";
import schedule from "../images/schedule_icon.png";
import music from "../images/host_music_icon.png";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import ContentHeader from "./content_header";
import FeaturedContent from "./featured_content";
import history from "./../history";

const Hosts = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <h1>Want to host a local livestream concert at your venue?</h1>
              <Row>
                <Col size={2}></Col>
                <Col size={1}>
                  <button onClick={() => history.push("/apply_to_host")}>
                    Apply to Host
                  </button>
                </Col>
                <Col size={1}>
                  <button onClick={() => history.push("/host_again")}>
                    I've hosted before
                  </button>
                </Col>
                <Col size={2}></Col>
              </Row>
              <img className="main-image" src={background} alt="nav-logo"></img>
            </div>
          </Col>
        </Row>

        <Row>
          <div className="spacer"></div>
        </Row>

        <Row>
          <Col size={2}></Col>
          <Col size={3}>
            <h2>Bring People Together, For Music</h2>
            <p className="description-text">
              Onfour enables you to easily host a unique experience at your
              venue, get new faces in your doors, and promote your brand.
            </p>
          </Col>
          <Col size={2}></Col>
        </Row>

        <div className="spacer"></div>

        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <img className="icon" src={application}></img>
          </Col>
          <Col size={1}>
            <img className="icon" src={schedule}></img>
          </Col>
          <Col size={1}>
            <img className="icon" src={music}></img>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <p className="description-text">
              If you have never hosted an Onfour show, we need to understand a
              little bit about your space.
            </p>
          </Col>
          <Col size={1}>
            <p className="description-text">
              Simply select the performance from the Onfour calendar that you're
              interested in hosting.
            </p>
          </Col>
          <Col size={1}>
            <p className="description-text">
              On the day of the show, we will send a crew to help you setup, and
              clean up. All you have to do is open your doors and be yourself.
            </p>
          </Col>
          <Col size={1}></Col>
        </Row>

        <Row>
          <Col size={2}> </Col>
          <Col size={3}>
            <hr className="line-divider"></hr>
            <div className="spacer"></div>
          </Col>
          <Col size={2}> </Col>
        </Row>

        <Row>
          <Col size={1}>
            <h2>Featured Venues</h2>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <p className="description-text">
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
