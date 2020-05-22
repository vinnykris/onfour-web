import React, { useState, useEffect } from "react";
import FeaturedContent from "./featured_content";
import searchBar from "../search_bar/search_bar";
import jon_may_10 from "../../images/upcoming_shows/Jon_may10_cropped.jpg";
import concert from "../../images/upcoming_shows/concert_placeholder.jpeg";
// import * as mutations from "../../graphql/mutations";
import CountdownTimer from "../stream_page/clock";
import Modal from "../payment/ticket_modal";
// import { API, graphqlOperation } from "aws-amplify";

// Styling Imports
import { Grid, Row, Col } from "../grid";
import "./upcoming_show_page_styles.scss";



const upcoming_show = () => {
  return (
    <div className="stream-page-content">
      <Modal></Modal>
      <Grid className="upcoming-show-grid">
        <Row className="search-bar">
          <Col size= {1}>
            <p>{new Date().toLocaleString()}</p>
          </Col>
          <Col size={1}>
            <p>{Date.now()}</p>
          </Col>
          <Col size={1}>
            <p>{+new Date("2020-06-04") - +new Date()}</p>
          </Col>
        </Row>
        <Row>
          <div class="col-md-8 column-in-center">
            <FeaturedContent
              img={jon_may_10}
              name={"Jonathan Dely"}
              concert_name={"Mother's Day Concert"}
              date={"Sunday | 20 May 2020"}
              month={"MAY"}
              day={10}
              time={"8PM EST"}
            />
          </div>
        </Row>
        <Row>
          <div class="col-md-8 column-in-center">
            <FeaturedContent
              img={concert}
              name={"Jonathan Dely"}
              concert_name={"Mother's Day Concert"}
              date={"Sunday | 20 May 2020"}
              month={"MAY"}
              day={10}
              time={"8PM EST"}
            />
          </div>
        </Row>
        <Row>
          <div class="col-md-8 column-in-center">
            <FeaturedContent
              img={concert}
              name={"Jonathan Dely"}
              concert_name={"Mother's Day Concert"}
              date={"Sunday | 20 May 2020"}
              month={"MAY"}
              day={10}
              time={"8PM EST"}
            />
          </div>
        </Row>
      </Grid>
    </div>
  );
};

export default upcoming_show;

