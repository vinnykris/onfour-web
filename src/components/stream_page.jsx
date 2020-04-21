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

class StreamPage extends Component {
  // streamError = (e) => {
  //   console.log(e, "stream is erroring.");
  // };

  // streamStart = () => {
  //   console.log("stream is started.");
  // };

  // streamReady = () => {
  //   console.log("stream is ready.");
  // };

  joinSubmit = (name, mode) => {
    console.log(name);
    console.log(mode);
    this.setState({
      chatName: name,
      showChat: mode,
    });
    // setChat(mode);
  };

  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
      showChat: false,
      chatName: "",
    };
    console.log("constructed");
  }

  render() {
    console.log("rendered");
    // console.log(this.state.showChat);
    return (
      <div className="stream-page-content">
        <Grid>
          <Row>
            <Col size={1}></Col>
            <Col size={7}>
              <Row>
                <Col size={1}>
                  <h2>SUPERFRIEND</h2>
                </Col>
              </Row>
              <div className="stream-main">
                <div className="stream-wrapper">
                  <VideoPlayer
                    url={
                      "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
                    }
                  />
                </div>
              </div>
              <SocialBar />
            </Col>
            <Col className="flex-col" size={3}>
              <div className="chat-main">
                <div className="chat-wrapper">
                  {this.state.showChat ? (
                    <Chat chatName={this.state.chatName} />
                  ) : (
                    <Join joinSubmit={this.joinSubmit} />
                  )}
                </div>
              </div>
            </Col>
            <Col size={1}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default StreamPage;
