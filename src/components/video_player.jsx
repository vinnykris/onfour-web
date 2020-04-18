import React from "react";
import ReactPlayer from "react-player";
import "../styles.scss";

const VideoPlayer = ({ url }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="video-player"
        url={url}
        width="100%"
        height="100%"
        playing
        controls
      />
    </div>

    // <div
    // className="video"
    // style={{
    //     position: "relative",
    //     paddingBottom: "56.25%" /* 16:9 */,
    //     paddingTop: 25,
    //     height: 0
    // }}
    // >
    // <iframe
    // style={{
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     width: "100%",
    //     height: "100%"
    // }}
    // src={`https://www.youtube.com/embed/${youtubeId}`}
    // frameBorder="0"
    // />
    // </div>
  );
};

export default VideoPlayer;
