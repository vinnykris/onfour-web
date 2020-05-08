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
          </Col>
          

        </Row>
        <Row>
          
        </Row>
      </Grid>
    </div>
  );
};

export default FeaturedContent;
