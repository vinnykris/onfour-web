import React from "react";
import ReactPlayer from "react-player";
import "../styles.scss";

const StreamPage = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="video-player"
        url="https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
        width="100%"
        height="75vh"
        playing
        controls
      />
      {/* <iframe
        width="420"
        height="315"
        src="https://d20g8tdvm6kr0b.cloudfront.net/out/v1/6ec8306782ce45fc8f1657cd08538339/CFAM_manifest/index.m3u8"
      ></iframe>
      <iframe
        width="420"
        height="315"
        src="https://d20g8tdvm6kr0b.cloudfront.net/out/v1/92230237c4fa4aba8f3e83f699b505cc/index.mpd"
      ></iframe>

      <iframe
        width="420"
        height="315"
        src="https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
      ></iframe>

      <iframe
        width="420"
        height="315"
        src="https://d20g8tdvm6kr0b.cloudfront.net/out/v1/c1ef470e6e87446f93570dc52549d55e/index.ism/Manifest"
      ></iframe> */}
    </div>
  );
};

export default StreamPage;
