import React, { Component } from "react";
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

class StreamPage extends Component {
  joinSubmit = (name, mode) => {
    this.setState({
      chatName: name,
      showChat: mode,
    });
  };

  chatStatus = (mode) => {
    this.setState({
      showChat: mode,
    });
  };

  // emailSubmit = (event) => {
  //   event.preventDefault();

  //   this.setState({
  //     email:
  //   });

  //   const payload = {
  //     email: this.state.email,
  //     paid: false,
  //   };

  //   API.graphql(
  //     graphqlOperation(mutations.createOnfour_current, { input: payload })
  //   );

  //   this.setState({
  //     email: "",
  //     emailSubmitted: true,
  //   });
  // };

  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
      showChat: false,
      chatName: "",
      email: "",
      emailSubmitted: false,
    };
    var emailText = "";
  }

  render() {
    return (
      <div className="stream-page-content">
        <Grid>
          <Row>
            <Col size={1}></Col>
            <Col size={7}>
              <Row>
                <Col size={1}>
                  <h1>Onfour Presents: SUPERFRIEND</h1>
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
                  {this.state.showChat ? (
                    <Chat
                      chatName={this.state.chatName}
                      chatStatus={this.chatStatus}
                    />
                  ) : (
                    <Join joinSubmit={this.joinSubmit} />
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
              {/* {(() => {
                if (this.state.emailSubmitted) {
                  return <div>Thank you and stay tuned! :)</div>;
                } else {
                  return (
                    <form
                      class="inline-form"
                      action="/"
                      id="newsletter"
                      onSubmit={this.emailSubmit}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email here..."
                        name="email"
                        required
                        value={this.emailText}
                        style={{ width: "350px" }}
                        onChange={(event) =>
                          onChange()
                        }
                      />
                      <button
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
              })()} */}
            </Col>
            <Col size={1}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default StreamPage;
