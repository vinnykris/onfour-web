import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./stream_styles.scss";

import WaitingScreen from "../../images/stream_waiting_img.png";

class VideoPlayer extends Component {
  render() {
    const { url } = this.props;
    return (
      // <div className="player-wrapper">
      //   <ReactPlayer
      //     className="video-player"
      //     url={url}
      //     width="100%"
      //     height="100%"
      //     playing
      //     controls
      //   />
      // </div>
      <img
        className="waiting-screen"
        src={WaitingScreen}
        alt="waiting-screen"
      ></img>
    );
  }
}

export default VideoPlayer;
