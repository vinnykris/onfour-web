import React, { Component } from "react";
import VideoPlayer from "./video_player";
import axios from "axios";
import "../styles.scss";
import { render } from "@testing-library/react";

class StreamPage extends Component {
  streamError = (e) => {
    console.log(e, "stream is erroring.");
  };

  streamStart = () => {
    console.log("stream is started.");
  };

  streamReady = () => {
    console.log("stream is ready.");
  };

  componentDidUpdate() {
    console.log("component updated");
    axios
      .get(
        "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log("error: ", response);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
    };
    console.log("constructed");
    axios
      .get(
        "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
      )
      .then((response) => {
        console.log("success");
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
    // Don't call this.setState() here!
    // this.state = { counter: 0 };
    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    console.log("rendered");
    return (
      <div className="stream-main">
        <div className="stream-wrapper">
          <VideoPlayer
            url={
              "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
            }
            streamError={this.streamError}
            streamStart={this.streamStart}
            streamReady={this.streamReady}
          />
        </div>
      </div>
    );
  }
}

export default StreamPage;
