import React from "react";
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

const FeaturedContent = ({ img, name, date, time }) => {
  const joinSubmit = () => {
    console.log("clicked!")
  };
  return (
    <div className="featured-content" onClick={joinSubmit}>
      <Grid>
        <Row>
          <img className="feature-placeholder" src={img} alt="content-img"></img>
        </Row>
        <Row>
          <div className="show-content-bar">
            <Row>
              <Col size={1}>
                <h2 className="artist-name">{name}</h2>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
              <Col size={1}>
                <h2 className="time">{time}</h2>
              </Col>
              <Col size={1}>
                <h2 className="date">{date}</h2>
              </Col>
            </Row>
          </div>
        </Row>
      </Grid>
    </div>
  );
};

export default FeaturedContent;
