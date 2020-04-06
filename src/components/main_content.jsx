import React from "react";
import background from "../images/home_page_background.jpeg";
import concert from "../images/concert_placeholder.jpeg";
import artist from "../images/artist_placeholder.jpg";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import ContentHeader from "./content_header";
import FeaturedContent from "./featured_content";

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
            <FeaturedContent img={concert} />
          </Col>
          <Col size={1}>
            <FeaturedContent img={concert} />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={1}>
            <FeaturedContent img={concert} />
          </Col>
          <Col size={1}>
            <FeaturedContent img={concert} />
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
            <FeaturedContent img={artist} />
          </Col>
          <Col size={1}>
            <Row>
              <Col size={1}>
                <FeaturedContent img={artist} />
              </Col>
              <Col size={1}>
                <FeaturedContent img={artist} />
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                <FeaturedContent img={artist} />
              </Col>
              <Col size={1}>
                <FeaturedContent img={artist} />
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
