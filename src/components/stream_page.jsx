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
          <Col size={1}></Col>
          <Col size={7}>
            <Row>
              <Col size={1}>
                <h2 className="artistname">SUPERFRIEND</h2>
              </Col>
            </Row>
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
          <Col size={1}></Col>
          <Col size={7}>
            <SocialBar />
          </Col>
          <Col size={3}>
            <div className="stream-email-col">
              <Row>
                <Col size={1}>
                  <p className="description-text">
                    To stay informed about upcoming events, subscribe to our
                    mailing list:
                  </p>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  {(() => {
                    if (emailSubmitted) {
                      return <div>Thank you and stay tuned! :)</div>;
                    } else {
                      return (
                        <form
                          className="inline-form"
                          action="/"
                          id="newsletter"
                          onSubmit={emailSubmit}
                        >
                          <input
                            className="stream-page-email"
                            type="email"
                            placeholder="Enter your email here..."
                            name="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <button
                            className="stream-page-email-button"
                            type="submit"
                            form="newsletter"
                            value="Submit"
                            style={{ width: "90px" }}
                          >
                            Submit
                          </button>
                        </form>
                      );
                    }
                  })()}
                </Col>
              </Row>
            </div>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>
    </div>
  );
};

export default StreamPage;
