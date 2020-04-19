import React, { Component } from "react";
import ReactPlayer from "react-player";
import "../styles.scss";

class VideoPlayer extends Component {
  render() {
    const { url, streamError, streamStart, streamReady } = this.props;
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="video-player"
          url={url}
          width="100%"
          height="100%"
          playing
          controls
          onError={streamError}
          onStart={streamStart}
          onReady={streamReady}
        />
      </div>
    );
  }
}

export default VideoPlayer;
