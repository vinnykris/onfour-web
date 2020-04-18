import React from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "./video_player";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";

const StreamPage = () => {
  return (
    <div className="stream-main">
      <div className="stream-wrapper">
        <VideoPlayer
          url={
            "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
          }
        />
      </div>
    </div>

    // <div className="player-wrapper">
    //   <div className="video-container">
    //     <ReactPlayer
    //       className="video-player"
    //       url="https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
    //       width="100%"
    //       height="100%"
    //       playing
    //       controls
    //     />
    //   </div>
    // </div>
  );
};

export default StreamPage;
