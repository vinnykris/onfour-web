import React, { useState } from "react";
import VideoPlayer from "./video_player";
import axios from "axios";
import "../styles.scss";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./chat/stream_chat";
import Join from "./chat/join_chat";
import { Grid, Row, Col } from "./grid";
import SocialBar from "./social_bar";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../AppSync";
import VenmoCode from "../images/venmo-codecolor.png";

Amplify.configure(awsmobile);

const StreamPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

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

  return (
    <div className="stream-page-content">
      <Grid>
        <Row>
          <Col size={1}>
            <h2 className="artistname">SUPERFRIEND</h2>
          </Col>
        </Row>
        <Row>
          <Col size={1} className="socialbarcenter">
            <div className="social-media">
              <ul className="social-list">
                <li>
                  <a
                    href="https://www.instagram.com/superduperfriend/"
                    class="fa fa-instagram"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://open.spotify.com/artist/58aQLz2Bw72YzALyncUm9T?si=6GjQHHueSvSM79yjCuY6-w"
                    class="fa fa-spotify"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UC8Mo_XFsrzJr7bxrwdQ93GQ/featured"
                    class="fa fa-youtube"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/superduperfriend"
                    class="fa fa-facebook"
                    target="_blank"
                  ></a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size={1}></Col>

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
          </Col>
          <Col className="flex-col" size={3}>
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
          <Col size={1} className="donatebox">
            <p className="donatetitle">Donate</p>
            <p className="donatedescribtion">
              Scan the QR code below to donate on Venmo.
              <br></br>All proceeds will go to MusiCares.
            </p>

            <img className="venmo-code" src={VenmoCode}></img>
          </Col>

          <Col size={1} className="streamsubscribebox">
            <p className="subscribetitle">Subscribe</p>
            <p className="subscribedescribtion">
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
                    onSubmit={emailSubmitted}
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
                      className="buttonborder buttonheight"
                    >
                      Submit
                    </button>
                  </form>
                );
              }
            })()}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default StreamPage;
