// React Imports
import React from "react";
import ReactPlayer from "react-player";

// Styling Imports
import "./artist_stream_styles.scss";
import { useWindowDimensions } from "../custom_hooks";

// AWS Imports
import Amplify from "aws-amplify";
import awsmobile from "../../apis/AppSync";

Amplify.configure(awsmobile);

// VideoPlayer displays countdown message when the current time is behind the start time
// of the upcoming concert. When the time is up, it will display the stream video instead
function VideoPlayer({ url, is_live }) {
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // Showing the stream
  return (
    <div className="player-wrapper">
      {width <= 600 ? (
        <div className="player-inner-container">
          <ReactPlayer
            className="video-player"
            url={url}
            width="100%"
            height="100%"
            playing
            controls
            playsinline
            muted={!is_live}
          />
          {is_live ? (
            <div className="is-live-tag">LIVE</div>
          ) : (
            <div className="is-live-tag">OFFLINE</div>
          )}
        </div>
      ) : (
        <div className="player-inner-container">
          <ReactPlayer
            className="video-player"
            url={url}
            width="100%"
            height="100%"
            playing
            controls
            muted={!is_live}
          />
          {is_live ? (
            <div className="is-live-tag">
              <i class="fa fa-circle live-circle"></i>
              LIVE
            </div>
          ) : (
            <div className="is-live-tag">OFFLINE</div>
          )}
        </div>
      )}
    </div>
  );
}
export default VideoPlayer;
