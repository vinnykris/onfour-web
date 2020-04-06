import React from "react";
import musicianbackground from "../images/musician_background.jpg";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";
import applicationicon from "../images/application_icon.png";
import calendericon from "../images/calender_icon.png";
import setupicon from "../images/setup_icon.png";
import playicon from "../images/play_icon.png";

const MainContent = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <img
              className="musician-background"
              src={musicianbackground} >
            </img>
          </Col>
        </Row>


        <Row>
        <Col size={2}> </Col>
            <Col size={3}>
                <h1>Reach your fans no matter where they are</h1>
                <p>We are dedicated to making the process of providing a high-quality, interactive experience to your fans as easy and seamless as possible. Performing an Onfour show requires just 4 steps, and we are here to help you at every step along the way</p>
            </Col>
            <Col size={2}> </Col>
        </Row>

        <Row>
          <div className="spacer"></div>
        </Row>

        <Row>
          <Col size={1}></Col>

          <Col size={1}> 
           <img 
           className="icon"
           src={applicationicon}></img>
           <p>Submit an application for us to verify who you are If you have never performed an Onfour show. </p>
          </Col>

          <Col size={1}>
          <img 
           className="icon"
           src={calendericon}></img>
           <p>Simply book the date and time that you wish to perform, —(more words)—-</p>
          </Col>

          <Col size={1}>
            <img
           className="icon"
           src={setupicon}></img>
           <p>Set up your stream through our step by step guide. Customize your stream by selecting from our interactive features to give your fans a truly unique experience.</p>
          </Col>

          <Col size={1}>
            <img
           className="icon"
           src={playicon}></img>
           <p>Do a quick sound check 30 minutes before the show and enjoy your performance!</p>
           </Col>

          <Col size={1}></Col>
        </Row>
     
      </Grid>
    </div>
  );
};

export default MainContent;