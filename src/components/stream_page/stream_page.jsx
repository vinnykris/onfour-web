import React, { useState } from "react";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../../AppSync";

// Component Imports
import VideoPlayer from "./video_player";
import Chat from "../chat/stream_chat";
import Join from "../chat/join_chat";
import { Grid, Row, Col } from "../grid";
import SocialBar from "../social_bar/social_bar";
import Modal from "../payment/payment_modal";

// Styles Imports
import "./stream_styles.scss";

// Image imports
import VenmoCode from "../../images/jon_dely_venmo.jpeg";

Amplify.configure(awsmobile);

const StreamPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [scroll, setScroll] = useState(true);

  const joinSubmit = (name, mode) => {
    setChatName(name);
    setShowChat(mode);
  };

  const chatStatus = (mode) => {
    setShowChat(mode);
  };

  const emailSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      paid: false,
    };

    API.graphql(
      graphqlOperation(mutations.createOnfour_current, { input: payload })
    );

    setEmail("");
    setEmailSubmitted(true);
  };

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScroll(false);
  }

  return (
    <div className="stream-page-content">
      <Grid>
        <Row>
          <Col size={0.5}></Col>
          <Col size={7}>
            <div className="stream-main">
              <div className="stream-wrapper">
                <VideoPlayer
                  url={
                    "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                  }
                />
              </div>
            </div>
            <Row>
              <Col size={2}>
                <Row>
                  <h2 className="artist-name">Jonathan Dely</h2>
                </Row>
                <Row>
                  <h5 className="show-time">
                    Friday 24th April 8:00PM EST (refresh the page if stream
                    doesn't show up)
                  </h5>
                </Row>
              </Col>
              <Col size={1} className="social-bar-center">
                <SocialBar />
              </Col>
            </Row>
            <Row></Row>
          </Col>
          <Col size={3}>
            <div className="chat-main">
              <div className="chat-wrapper">
                {showChat ? (
                  <Chat chatName={chatName} chatStatus={chatStatus} />
                ) : (
                  <Join joinSubmit={joinSubmit} />
                )}
              </div>
            </div>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>

        <Row>
          <Col size={3} className="donate-box">
            <Row>
              <Col size={2}>
                <p className="donate-title">Donate to the Artist</p>
                <p className="donate-description">
                  To donate to Jonathan Dely on Paypal,{" "}
                  <a
                    href="http://paypal.me/jonathandely"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here.
                  </a>
                  <br></br>
                  <br></br>Or, scan the QR code to the right to donate to
                  <br></br>@Jonathan-Dely on Venmo.
                </p>
                <button className="button-border button-height" data-toggle="modal" data-target="#exampleModal">Donate</button> {" "}
                <Modal isOpen={false}></Modal>
              </Col>
              <Col size={1}>
                <img
                  className="venmo-code"
                  src={VenmoCode}
                  alt="venmo-qr"
                ></img>
              </Col>
            </Row>
          </Col>

          <Col size={2} className="stream-subscribe-box">
            <p className="stream-subscribe-title">Subscribe</p>
            <p className="stream-subscribe-description">
              To stay informed about upcoming events,<br></br> subscribe to our
              mailing list:
            </p>
            {(() => {
              if (emailSubmitted) {
                return <div>Thank you and stay tuned! :)</div>;
              } else {
                return (
                  <form
                    class="inline-form"
                    action="/"
                    id="newsletter"
                    onSubmit={emailSubmit}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email here..."
                      name="email"
                      required
                      value={email}
                      style={{ width: "280px" }}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <button
                      type="submit"
                      form="newsletter"
                      value="Submit"
                      style={{ width: "100px" }}
                      className="button-border button-height"
                    >
                      {" "}
                      Submit
                      {/* <div> */}
                      {/* <input
                          type="email"
                          placeholder="Enter your email here..."
                          name="email"
                          required
                          value={email}
                          style={{ width: "280px" }}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <button
                          type="submit"
                          form="newsletter"
                          value="Submit"
                          style={{ width: "100px" }}
                          //className="button-border button-height"
                        > */}
                      {/* Submit
                          </div> */}
                    </button>
                  </form>
                );
              }
            })()}
            {/* </div> */}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default StreamPage;
