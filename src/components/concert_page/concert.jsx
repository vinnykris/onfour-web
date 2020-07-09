// React Imports
import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

// Styling Imports
import "./concert_styles.scss";
import { Grid, Row, Col } from "../grid";
import { createUpcomingObject } from "../util";

// AWS Imports
import { Analytics } from "aws-amplify";
import { useEffect } from "react";

// Component Imports
import CountdownTimer from "../countdown_timer/countdown_timer";
import { getOneConcert } from "../../apis/get_concert_data";
import SocialBar from "../social_bar/social_bar";
import Tooltip from "@material-ui/core/Tooltip";

// Concert is the unique concert page
const Concert = (props) => {
  const [concert_info, setConcertInfo] = useState(null); // Holds concert-specific info
  const [tooltip_text, setTooltipText] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  // const [show, setShow] = useState(false);

  const concert_id = props.match.params.showID; // Passed from URL
  const state = props.location.state; // Props passed through link

  // Runs on mount
  useEffect(() => {
    if (state) {
      // If data is coming from upcoming show page
      setConcertInfo(state.info);
    } else {
      // If data needs to be loaded from ID in URL
      // Only reached if user does not come from upcoming page
      const fetchConcert = async (id) => {
        const data = await getOneConcert(id);
        setConcertInfo(createUpcomingObject(data));
      };
      fetchConcert(concert_id);
    }
    setTooltipText("Copy to clipboard");
    setFacebookLink(
      `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.onfour.live%2Fupcoming%2F${concert_id}&amp;src=sdkpreparse`
    );
  }, []);

  // If copy to clipboard button is clicked, change tooltip text and copy stream page link
  // Record analytics for click as well
  const copyToClipboard = () => {
    // Analytics.record({ name: "copyClipboardShareClicked" });
    navigator.clipboard.writeText(window.location.href);
    setTooltipText("Copied!");
  };

  return (
    <div className="concert-page">
      {!concert_info ? (
        <div className="overlay-box">
          <PulseLoader
            sizeUnit={"px"}
            size={18}
            color={"#7b6dac"}
            loading={!concert_info}
          />
        </div>
      ) : (
        <Grid>
          <Row className="info-row">
            <Col size={1} className="concert-info-col">
              <div className="concert-image-container">
                <img className="concert-image" src={concert_info.img}></img>
              </div>
              <div className="concert-logistics">
                <Row>
                  <div className="concert-genre-box">
                    {concert_info.genre.toUpperCase()}
                  </div>
                </Row>
                <Row className="logistics-row">
                  <span className="logistics-text">
                    {concert_info.week_day.toUpperCase()},{" "}
                    {concert_info.formatted_date}
                  </span>
                </Row>
                <hr class="solid" />
                <Row className="logistics-row">
                  <span className="logistics-text">
                    {concert_info.formatted_time} EST
                  </span>
                </Row>
                <hr class="solid" />
                <Row className="logistics-row">
                  <span className="logistics-text">STREAMED FROM NEW YORK</span>
                </Row>
                <hr class="solid" />
                <SocialBar />
              </div>
            </Col>
            <Col size={2} className="concert-info-col main-info-col">
              <Row className="countdown-and-buttons">
                <Col size={1}>
                  <div className="countdown-timer">
                    {/* <span className="countdown">COUNTDOWN TIMER</span> */}
                    <CountdownTimer
                      start_date={concert_info.date}
                      start_time={concert_info.time}
                    />
                  </div>
                </Col>
                <Col size={1}>
                  <div className="buy-ticket">
                    <button className="buy-ticket-button">Buy Ticket</button>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="concert-text-container">
                  <Col size={1}>
                    <div>
                      <h3 className="titles">
                        {concert_info.name.toUpperCase()} –{" "}
                        {concert_info.concert_name.toUpperCase()}
                      </h3>
                    </div>
                    <div>
                      <p className="artist-description-text">
                        {concert_info.description}
                      </p>
                    </div>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="share-concert-container">
                  <Col size={1}>
                    <div>
                      <h5 className="share-concert-text">Share With Friends</h5>
                    </div>
                    <div className="share-list-container">
                      <ul className="social-list">
                        <li>
                          <a
                            onClick={Analytics.record({
                              name: "facebookShareClicked",
                            })}
                            href={facebook_link}
                            className="fa fa-facebook-official fb-xfbml-parse-ignore"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Facebook Link</span>
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={Analytics.record({
                              name: "twitterShareClicked",
                            })}
                            className="fa fa-twitter twitter-share-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/intent/tweet?text=Come%20watch%20a%20concert%20with%20me&url=https%3A%2F%2Fonfour.live%2Fstream"
                            data-text="Come watch a concert with me!"
                            data-url={window.location.href}
                            data-lang="en"
                            data-show-count="false"
                          >
                            <span>Twitter Link</span>
                          </a>
                          <script
                            async
                            src="https://platform.twitter.com/widgets.js"
                            charset="utf-8"
                          ></script>
                        </li>
                        <li>
                          <Tooltip title={tooltip_text}>
                            <span onClick={copyToClipboard}>
                              <i className="fa fa-clone">
                                <span>Copy Link</span>
                              </i>
                            </span>
                          </Tooltip>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="suggested-shows"></Row>
        </Grid>
      )}
    </div>
  );
};

export default Concert;
