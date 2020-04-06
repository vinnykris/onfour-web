import React from "react";
import background from "../images/home_page_background.jpeg";
import concert from "../images/concert_placeholder.jpeg";
import artist from "../images/artist_placeholder.jpg";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import ContentHeader from "./content_header";

const MainContent = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <img
              className="background-image"
              src={background}
              alt="nav-logo"
            ></img>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <ContentHeader headerTitle={"Featured Concerts"} />
          </Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <div className="featured-concert">
              <img
                className="feature-placeholder"
                src={concert}
                alt="concert-img"
              ></img>
            </div>
          </Col>
          <Col size={1}>
            <div className="featured-concert">
              <img
                className="feature-placeholder"
                src={concert}
                alt="concert-img"
              ></img>
            </div>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <div className="featured-concert">
              <img
                className="feature-placeholder"
                src={concert}
                alt="concert-img"
              ></img>
            </div>
          </Col>
          <Col size={1}>
            <div className="featured-content">
              <img
                className="feature-placeholder"
                src={concert}
                alt="concert-img"
              ></img>
            </div>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}>
            <ContentHeader headerTitle={"Featured Artists"} />
          </Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <div className="featured-content">
              <img
                className="feature-placeholder"
                src={artist}
                alt="artist-img"
              ></img>
            </div>
          </Col>
          <Col size={1}>
            <Row>
              <Col size={1}>
                <div className="featured-content">
                  <img
                    className="feature-placeholder"
                    src={artist}
                    alt="artist-img"
                  ></img>
                </div>
              </Col>
              <Col size={1}>
                <div className="featured-content">
                  <img
                    className="feature-placeholder"
                    src={artist}
                    alt="artist-img"
                  ></img>
                </div>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                <div className="featured-content">
                  <img
                    className="feature-placeholder"
                    src={artist}
                    alt="artist-img"
                  ></img>
                </div>
              </Col>
              <Col size={1}>
                <div className="featured-content">
                  <img
                    className="feature-placeholder"
                    src={artist}
                    alt="artist-img"
                  ></img>
                </div>
              </Col>
            </Row>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>
    </div>
  );
};

export default MainContent;
