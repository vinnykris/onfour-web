// React Imports
import React from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

// Component Imports
// import FestivalBio from "./festival_bio";

const bioModal = ({
  days_left,
  artist_name,
  concert_name,
  img,
  price,
  weekday,
  date,
  time,
  description,
  width,
}) => {
  return (
    <div className="modal-container">
      {width > 600 ? (
        <Grid className="modal-container">
          <Row className="modal-container">
            <Col size={4} className="modal-description-col">
              <Row>
                <div className="modal-date">IN {days_left} DAYS</div>
              </Row>
              <Row>
                <div className="modal-bio-title">
                  {artist_name.toUpperCase()} - {concert_name.toUpperCase()}
                </div>
              </Row>
              <Row className="modal-description-container">
                <div className="modal-bio-description">{description}</div>
                {/* FOR FESTIVAL BIO STYLE, USE THE FOLLOWING FORMAT */}
                {/* <div className="festival-bio-description">
                                    <div className="disclaimer">
                                        {"ALL PROCEEDS WILL BE SPLIT 50/50 BETWEEN THE FOR THE GWORLS & LGBTQ FREEDOM FUND "}
                                    </div>
                                    <a href="https://www.justicespeaks.info/the-cause" target="_blank">learn more about both organizations</a>
                                    <div className="line-up">
                                        {"\n"}LINE UP
                                                </div>
                                    <FestivalBio
                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}
                                        name={"Achille Tenkiang"}
                                        bio={"Achille Tenkiang is an aspiring attorney and creative passionate about connecting and equipping people with the tools and resources they need to advocate for Black Lives. A multitalented performer, Tenkiang is a proud alumnus of Princeton University’s Ellipses Slam Poetry Team and Umqombothi African Music Ensemble. While living in Nairobi, he organized a series of slam poetry workshops with urban refugee youth. And while living in Paris last year, he continued his creative pursuits, starring in Loline Stage and Film’s production of Katori Hall’s award-winning play \"The Mountaintop.\""}
                                        num={1}
                                    />
                                </div> */}
              </Row>
            </Col>
            <Col size={2} className="modal-info-col">
              <Row>
                <div className="modal-image-container">
                  <img
                    className="modal-bio-image"
                    src={img}
                    alt="artist-img"
                  ></img>
                </div>
              </Row>
              <Row className="modal-info-row first-row">
                <a className="modal-info" href="https://www.onfour.live/stream">
                  https://www.onfour.live/stream
                </a>
              </Row>
              <Row className="modal-info-row">
                <div className="modal-info">
                  {weekday.toUpperCase()}, {date}
                </div>
              </Row>
              <Row className="modal-info-row last-row">
                <div className="modal-info">{time} EST</div>
              </Row>
              <Row className="modal-ticket">
                {price ? (
                  <button className="modal-ticket-button" id="buy_ticket">
                    BUY TICKET
                  </button>
                ) : (
                  // <button className="modal-free-button" id="free" onClick={toBeImplemented}>FREE</button>
                  <div className="modal-free-button">FREE</div>
                )}
              </Row>
            </Col>
          </Row>
        </Grid>
      ) : (
        <Grid>
          <Row>
            <Col className="modal-description-col mobile">
              <Row>
                <div className="mobile-modal-image-container">
                  <img
                    className="modal-bio-image"
                    src={img}
                    alt="artist-img"
                  ></img>
                </div>
              </Row>
              <Row>
                <div className="modal-date">IN {days_left} DAYS</div>
              </Row>
              <Row>
                <div className="modal-bio-title">
                  {artist_name.toUpperCase()} - {concert_name.toUpperCase()}
                </div>
              </Row>
              <Row>
                <div className="mobile-modal-info">
                  {weekday.toUpperCase()} | {date} | {time} EST
                </div>
              </Row>
              <Row>
                <div className="mobile-modal-bio-description">
                  {description}
                </div>
                {/* FOR FESTIVAL BIO STYLE, USE THE FOLLOWING FORMAT */}
                {/* <div className="mobile-modal-bio-description">
                                    <div className="disclaimer">
                                        {"\nALL PROCEEDS WILL BE SPLIT 50/50 BETWEEN THE FOR THE GWORLS & LGBTQ FREEDOM FUND "}
                                    </div>
                                    <a href="https://www.justicespeaks.info/the-cause" target="_blank">learn more about both organizations</a>
                                    <div className="line-up">
                                        {"\n"}LINE UP
                                        </div>
                                    <FestivalBio
                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}
                                        name={"Achille Tenkiang"}
                                        bio={"Achille Tenkiang is an aspiring attorney and creative passionate about connecting and equipping people with the tools and resources they need to advocate for Black Lives. A multitalented performer, Tenkiang is a proud alumnus of Princeton University’s Ellipses Slam Poetry Team and Umqombothi African Music Ensemble. While living in Nairobi, he organized a series of slam poetry workshops with urban refugee youth. And while living in Paris last year, he continued his creative pursuits, starring in Loline Stage and Film’s production of Katori Hall’s award-winning play \"The Mountaintop.\""}
                                        num={1}
                                    />
                                </div> */}
              </Row>
            </Col>
          </Row>
        </Grid>
      )}
    </div>
  );
};

export default bioModal;
